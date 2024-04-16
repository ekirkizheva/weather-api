import { Controller, Get, Param, Res } from '@nestjs/common';
import { SensorService } from 'src/services/sensor/sensor.service';

@Controller('sensor')
export class SensorController {

    constructor(private sensorService: SensorService){}

    @Get()
    async getSensorData(@Res() response) {
        try {
            return await this.sensorService.getAllSensorsData();
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    async getSensorDataByDevice(@Res() response, @Param('id') device_name: string) {
        try {
            return await this.sensorService.getSensorsDataByDevice(device_name);
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
