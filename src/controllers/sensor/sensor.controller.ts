import { Controller, Get, HttpStatus, Param, Res, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';
import { SensorService } from 'src/services/sensor/sensor.service';

@Controller('sensor')
export class SensorController {

    constructor(private sensorService: SensorService){}

    /**
     * This endpoint allows users to list all sensors data.
     * 
     * @param response 
     * @returns 
     */
    @UseGuards(RoleGuard(['teacher', 'student']))
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

    /**
     * This endpoint allows users to query max precipitation by last 5 months.
     * 
     * @param start_date - expects start date of the range
     * @param end_date - expects end date of the range
     * @returns 
     */
    @UseGuards(RoleGuard(['teacher', 'student']))
    @Get(':device_name/max_precipitation')
    async getMaxPrecipitation (@Res() response, @Param('device_name') device_name: string) {
        try {
            const data = await this.sensorService.getMaxPrecipitation(device_name);
            return response.status(HttpStatus.OK).json({ data});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    /**
     * This endpoint allows users to query sensor data by device name and specific date.
     * 
     * @param id - expects device id (device_name) 
     * @param date - expects date
     * @returns 
     */
    @UseGuards(RoleGuard(['teacher', 'student']))
    @Get(':device_name/:date')
    async getSensorDataByDevice(@Res() response, @Param('device_name') device_name: string, @Param('date') date: Date) {
        try {
            const data = await this.sensorService.getSensorsDataByDevice(device_name, date);
            return response.status(HttpStatus.OK).json({
                message: `Data found for sensor ${device_name}`, data});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    /**
     * This endpoint allows users to query max temperature by date range.
     * 
     * @param start_date - expects start date of the range
     * @param end_date - expects end date of the range
     * @returns 
     */
    @UseGuards(RoleGuard(['teacher', 'student']))
    @Get('max_temp/:start_date/:end_date')
    async getMaxTempBetweenDates(@Res() response, @Param('start_date') start_date: Date, @Param('end_date') end_date: Date) {
        try {
            const data = await this.sensorService.getMaxTempBetweenDates(start_date, end_date);
            return response.status(HttpStatus.OK).json({ data});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }


}
