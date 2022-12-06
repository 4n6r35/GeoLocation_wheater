import inquirer from 'inquirer';
import 'colors';
//import { pausar } from './mensajes';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.red} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.red} Historial`
            },
            {
                value: 0,
                name: `${'0.'.red} Salir`
            },
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('============================='.blue);
    console.log('    Seleccione una opción'.red);
    console.log('=============================\n'.blue);
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}
const pausar = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.bgBlue} para continuar`
        }
    ];

    console.log('\n')
    await inquirer.prompt(question);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }

                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const Listar_lugares = async (lugares = []) => {

    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}.`.red;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0.'.red + 'Cancelar'
    });
    const preguntas = [
        {
            type: 'list',
            name: 'id_task',
            message: 'Seleccione lugar'.red,
            choices
        }
    ]
    const { id_task } = await inquirer.prompt(preguntas);
    return id_task;

}


export {
    inquirerMenu,
    pausar,
    leerInput,
    Listar_lugares
}