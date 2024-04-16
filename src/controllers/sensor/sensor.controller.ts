import { Controller, Get, Res } from '@nestjs/common';
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
}
