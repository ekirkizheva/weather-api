import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { SensorService } from 'src/services/sensor/sensor.service';

@Controller('sensor')
export class SensorController {

    constructor(private sensorService: SensorService){}

    @Get()
    async getSensorData(@Res() response) {
        try {
            const data = await this.sensorService.getAllSensorsData();
            return response.status(HttpStatus.OK).json({
                message: `Data found for all sensors`, data});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id/:date')
    async getSensorDataByDevice(@Res() response, @Param('id') device_name: string, @Param('date') date: Date) {
        try {
            const data = await this.sensorService.getSensorsDataByDevice(device_name, date);
            return response.status(HttpStatus.OK).json({
                message: `Data found for sensor ${device_name}`, data});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
