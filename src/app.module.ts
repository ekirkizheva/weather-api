import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { jwtConstants } from './constants/jtw-secret';
import { SensorController } from './controllers/sensor/sensor.controller';
import { UserController } from './controllers/user/user.controller';
import { SensorSchema } from './schema/sensor.schema';
import { UserSchema } from './schema/user.schema';
import { SensorService } from './services/sensor/sensor.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27117', { dbName: 'WeatherDB' }),
    MongooseModule.forFeature([
      { name: 'SensorData', schema: SensorSchema },
      { name: 'UserData', schema: UserSchema }
    ])],
  
  controllers: [AppController, SensorController, UserController],
  providers: [AppService, SensorService, UserService],
})
export class AppModule {}
