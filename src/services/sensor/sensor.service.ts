import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISensor } from 'src/interface/sensor.interface';

@Injectable()
export class SensorService {

    constructor(@InjectModel('SensorData') private sensorModel:Model<ISensor>) { }

    async getAllSensorsData(): Promise<ISensor[]> {
        return await this.sensorModel.find();
    }

    async getSensorsDataByDevice(device_name: string, date: Date): Promise<ISensor[]> {
        return await this.sensorModel.findOne({device_name, date: new Date(date) });
    }

    async getMaxTempBetweenDates(startDate: Date, endDate: Date): Promise<ISensor[]> {
        return await this.sensorModel.aggregate([
            {
                $match: { date: {$gte: new Date(startDate), $lte: new Date(endDate)} }  
            }, {
              $group:
                {
                  _id: "$device_name",
                  max_temp: { $max: "$temp" },
                  items: { $push: '$$CURRENT' }
                }
            }, {
                $project: {
                    _id: 0,
                    device_name: "$_id",
                    max_temp: 1,
                    dates_observed: {
                        $map: {
                             input: { 
                                 $filter: { 
                                   input: '$items', as: 'i', 
                                   cond: { $eq: [ '$$i.temp', '$max_temp' ] } 
                                 } 
                             },
                             as: 'maxOccur', 
                             in: '$$maxOccur.date' } 
                        }
               }
            }
          ]);
    }

    async getMaxPrecipitation(device_name: string): Promise<ISensor[]> {
        return await this.sensorModel.aggregate([
            {
                $match: { device_name, date: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 5)) } }
            }, {
              $group:
                {
                  _id: "$device_name",
                  max_precipitation: { $max: "$precipitation" },
                  items: { $push: '$$CURRENT' }
                }
            }, {
                $project: {
                    _id: 0,
                    device_name: "$_id",
                    max_precipitation: 1,
                    dates_observed: {
                        $map: {
                             input: { 
                                 $filter: { 
                                   input: '$items', as: 'i', 
                                   cond: { $eq: [ '$$i.precipitation', '$max_precipitation' ] } 
                                 } 
                             },
                             as: 'maxOccur', 
                             in: '$$maxOccur.date' } 
                        }
               }
            }
          ]);
    }

    private isSensorDataValid(sensor: ISensor): boolean {
      const expectedProperties = [
        'device_name',
        'date',
        'precipitation',
        'lat',
        'lon',
        'temp',
        'pressure',
        'wind_speed',
        'solar_radiation',
        'vapor_ressure',
        'humidity',
        'wind_direction'
      ];

      return expectedProperties.every((prop) => Object.keys(sensor).includes(prop))
    }

    async postSensor(sensor: ISensor): Promise<any> {
      if (!sensor || !this.isSensorDataValid(sensor)) throw new ForbiddenException('Missing or invalid parameters');

      if (sensor.temp > 60 || sensor.temp < -50) throw new ForbiddenException('Abnormal temperature readings');

      if (sensor.humidity > 100) throw new ForbiddenException('Abnormal humidity readings');

      return await this.sensorModel.insertMany([sensor]);
    }


    async postSensorDataById(device_name: string, sensor: ISensor[]): Promise<any> {
      if (!device_name || !sensor) throw new ForbiddenException('Missing or invalid parameters');

      const sensorData = sensor.map(elem => ({...elem, device_name})) as ISensor[];

      if (!sensorData.every(elem => this.isSensorDataValid(elem))) throw new ForbiddenException('Missing or invalid parameters');

      return await this.sensorModel.insertMany(sensorData);

    }

    async putSensorPrecipitation(id: string, data: any) : Promise<any> {
      if (!id || !data || !data.precipitation) throw new ForbiddenException('Missing or invalid parameters');

      const device_name = (await this.sensorModel.findById(id))?.device_name;

      await this.sensorModel.findOneAndUpdate({_id: id, device_name}, { precipitation: data.precipitation });

      return await this.sensorModel.findById(id);
    }
    
}
