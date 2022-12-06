
import axios from "axios";

class Busquedas {

    record = ['Tegucigalpa', 'Madrid', 'San José']

    constructor() {
        //TO DO: leer DB si existe        
    }

    async ciudad(lugar = '') {
        try {
            //peticion http
            // console.log('Ciudad',lugar)
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);
            return []; // retornar valores
        } catch (error) {
            return[]

        }

    }


}

export { Busquedas }