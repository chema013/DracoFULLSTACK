const Tarea = require('../models/tarea');

titulos = [
    'Titulo 1', 'Titulo 3', 'Titulo 5', 'Titulo 7', 'Titulo 9',
    'Titulo 2', 'Titulo 4', 'Titulo 6', 'Titulo 8', 'Titulo 10'
];

descripciones = [
    'Esta es la descripcion de una tarea de ejemplo 1', 'Esta es la descripcion de una tarea de ejemplo 4',
    'Esta es la descripcion de una tarea de ejemplo 7', 'Esta es la descripcion de una tarea de ejemplo 9',
    'Esta es la descripcion de una tarea de ejemplo 2', 'Esta es la descripcion de una tarea de ejemplo 5',
    'Esta es la descripcion de una tarea de ejemplo 8', 'Esta es la descripcion de una tarea de ejemplo 10',
    'Esta es la descripcion de una tarea de ejemplo 3', 'Esta es la descripcion de una tarea de ejemplo 6',
];

minutos = [120, 35, 60, 15, 40, 30, 25, 90, 12, 5];
segundos = [50, 45, 10, 15, 20, 35, 25, 10, 12, 8];
duracion = {};
fecha = {};
terminado = true;
hoy = new Date();
tareas = new Array();

let generaAleaorios = function() {
    for (let i = 0; i < 56; i++) {
        const numAleatorio = Math.floor(Math.random() * (10 - 0));
        if (i > 50) { terminado = false } else { terminado = true }
        let tarea = new Tarea({
            titulo: titulos[numAleatorio],
            descripcion: descripciones[numAleatorio],
            fecha: generaFecha(),
            minutos: Math.floor(Math.random() * (120 - 0)),
            segundos: Math.floor(Math.random() * (60 - 0)),
            creacion: hoy,
            terminado: terminado,
            duracion: getDuracion()
        });

        tarea.save((err, tareaDB) => {
            if (err) {
                console.log(err);
                return err;
            }
        });
    }
    return true;
};

let generaFecha = function() {
    const n = Math.floor(Math.random() * (8));
    const fecha = {
        day: hoy.getDate() - n,
        month: hoy.getMonth() + 1,
        year: hoy.getFullYear(),
    };
    return fecha;
};

let getDuracion = function() {
    const duracion = {
        hours: Math.floor(Math.random() * (2)),
        minutes: Math.floor(Math.random() * (60 - 1)) + 1,
        seconds: Math.floor(Math.random() * (60 - 1)) + 1,
    };
    return duracion;
};

module.exports = {
    generaAleaorios
};