import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorController } from './controllers/sensor/sensor.controller';
import { SensorSchema } from './schema/sensor.schema';
import { SensorService } from './services/sensor/sensor.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27117/WeatherDB'),
    MongooseModule.forFeature([{ name: 'Sensor', schema: SensorSchema }])],
  
  controllers: [AppController, SensorController],
  providers: [AppService, SensorService],
})
export class AppModule {}
