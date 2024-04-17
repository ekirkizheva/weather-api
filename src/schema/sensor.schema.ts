import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({collection: 'SensorData'})
export class SensorRecord {
   @Prop()
   device_name: string;

   @Prop()
   date: Date;
   
   @Prop()
   precipitation: number;
   
   @Prop()
   lat: number;
   
   @Prop()
   lon: number;
   
   @Prop()
   temp: number;
   
   @Prop()
   pressure: number;
   
   @Prop()
   wind_speed: number;
   
   @Prop()
   solar_radiation: number;
   
   @Prop()
   vapor_ressure: number;
   
   @Prop()
   humidity: number;
   
   @Prop()
   wind_direction: number;
   
}
export const SensorSchema = SchemaFactory.createForClass(SensorRecord);