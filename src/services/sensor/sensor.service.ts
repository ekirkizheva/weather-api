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
        return await this.sensorModel.findOne({device_name, time: new Date(date) });
    }
    
}
