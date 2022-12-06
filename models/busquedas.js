import fs from 'fs'
import axios from "axios";

class Busquedas {

    record = []
    dbPath = './db/database.json'

    constructor() {
        this.LeerDB();
    }

    get historialCapitalizado() {
        return this.record.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ')
        })
    }

    get paramsMapbox() {
        return {

            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad(lugar = '') {
        try {
            //peticion http
            const instances = axios.create({
                baseURL: ` https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            // retornar valores
            const resp = await instances.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        } catch (error) {
            return []


        }
    }
    async Climalugar(lat, lon) {
        try {

            const instances = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: { ...this.paramsWeather, lat, lon }
            })

            const resp = await instances.get();
            const { weather, main } = resp.data
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);

        }
    }

    agregarHistorial(lugar = '') {
        //TO DO: Prevenir duplicados
        if (this.record.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.record = this.record.splice(0, 4);
        this.record.unshift(lugar.toLocaleLowerCase());

        //Grabar en DB
        this.GuardarDB();
    }

    GuardarDB() {

        const payload = {
            record: this.record
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    LeerDB() {
        if (!fs.existsSync(this.dbPath)) return;
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        this.record = data.record;
    }

}

export { Busquedas }