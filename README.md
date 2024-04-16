Commands used when creating DB

sh.enableSharding("WeatherDB");
db.adminCommand( { shardCollection: "WeatherDB.SensorData", key: { "Device Name": "hashed" } } );


Import contents
```
const contents = [
    {
        content: "/Users/elena/Desktop/TAFE/WEB DATA cluster/SensorData_Final_NoWind.json",
        collection: "SensorData",
        idPolicy: "overwrite_with_same_id", //overwrite_with_same_id|always_insert_with_new_id|insert_with_new_id_if_id_exists|skip_documents_with_existing_id|abort_if_id_already_exists|drop_collection_first|log_errors
        //Use the transformer to customize the import result
        transformer: (doc) => { //async (doc)=>{
          return {
              device_name: doc["Device Name"],
              time: doc["Time"],
              precipitation: doc["Precipitation mm/h"],
              lat: doc["Latitude"],
              lon: doc["Longitude"],
              temp: doc["Temperature (°C)"],
              pressure: doc["Atmospheric Pressure (kPa)"],
              wind_speed: doc["Max Wind Speed (m/s)"],
              solar_radiation: doc["Solar Radiation (W/m2)"],
              vapor_ressure: doc["Vapor Pressure (kPa)"],
              humidity: doc["Humidity (%)"],
              wind_direction: doc["Wind Direction (°)"]
            }
        }
    }
];

mb.importContent({
    connection: "localhost",
    database: "WeatherDB",
    fromType: "file",
    batchSize: 2000,
    contents
})
```