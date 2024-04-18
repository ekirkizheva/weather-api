import { Injectable } from '@nestjs/common';
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
    console.log(device_name)
        const date = new Date().setMonth(new Date().getMonth() - 5);

        console.log(date)

        return await this.sensorModel.aggregate([
            {
                $match: { device_name, date: {$gte: new Date(date)} }
                
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
    
}
