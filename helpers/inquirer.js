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

const Borrartask = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.red;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
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
            message: 'Borrar'.bgRed,
            choices
        }
    ]
    const { id_task } = await inquirer.prompt(preguntas);
    return id_task;

}

const confirmar = async (message) => {

    const questionConfirm = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(questionConfirm);
    return ok;
}

const Checklist = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.red;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccion'.blue,
            choices
        }
    ]
    const { ids } = await inquirer.prompt(preguntas);
    return ids;

}

export {
    inquirerMenu,
    pausar,
    leerInput,
    Checklist,
    Borrartask,
    confirmar
}