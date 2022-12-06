import { inquirerMenu, leerInput, pausar } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";

const main = async () => {
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //Mostar mensaje
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);
                //Buscar lugar

                //Seleccionar el lugar

                //Clima

                //Mostrar resultados
                console.log('\n >> Información de la ciudad <<\n'.blue)
                console.log('Ciudad:',)
                console.log('Lat:',)
                console.log('Lng:',)
                console.log('Temperatura:',)
                console.log('Mínima:',)
                console.log('Máxima:',)
                break;
        }


        if (opt !== 0) await pausar();
    } while (opt !== 0)

}
main();