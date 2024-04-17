import { Document } from 'mongoose';
export interface ISensor extends Document {
    readonly device_name: string;
    readonly date: Date;
    readonly precipitation: number;
    readonly lat: number;
    readonly lon: number;
    readonly temp: number;
    readonly pressure: number;
    readonly wind_speed: number;
    readonly solar_radiation: number;
    readonly vapor_ressure: number;
    readonly humidity: number;
    readonly wind_direction: number;
}