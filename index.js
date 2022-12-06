import 'dotenv/config'
import { inquirerMenu, leerInput, Listar_lugares, pausar } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";

const main = async () => {
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //Mostar mensaje
                const busqueda = await leerInput('Ciudad: ');
                //Buscar lugar
                const lugares = await busquedas.ciudad(busqueda);
                //Seleccionar el lugar
                const id_select = await Listar_lugares(lugares);
                if (id_select === '0') continue;
                const Lugarselect = lugares.find(l => l.id === id_select);
                //Guardar en DB
                busquedas.agregarHistorial(Lugarselect.nombre)
                //Clima
                const clima = await busquedas.Climalugar(Lugarselect.lat, Lugarselect.lng);
                //Mostrar resultados
                console.log('\n >> Información de la ciudad <<\n'.blue)
                console.log('Ciudad:'.gray, Lugarselect.nombre.yellow)
                console.log('Lat:'.gray, Lugarselect.lat)
                console.log('Lng:'.gray, Lugarselect.lng)
                console.log('Temperatura:'.gray, clima.temp)
                console.log('Mínima:'.gray, clima.min)
                console.log('Máxima:'.gray, clima.max)
                console.log('Como está en clima:'.gray, clima.desc.yellow)
                break;

            case 2:

                busquedas.record.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.red
                    console.log(`${idx} ${lugar}`)

                });



                break;
        }


        if (opt !== 0) await pausar();
    } while (opt !== 0)

}
main();