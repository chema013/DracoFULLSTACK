const express = require('express');
let app = express();
const mongoose = require('mongoose');
const Tarea = require('../models/tarea');
const GeneraRandom = require('../controllers/creaAleatorios');

// ============================
// obtener todas las tareas
// ============================
app.get('/tareas', (req, res) => {

    Tarea.find()
        .exec((err, tareas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tareas
            });
        });
});

// ============================
// obtener una tarea por id
// ============================
app.get('/tareas/:id', (req, res) => {
    // populate: usuario categoria
    // paginado
    let id = req.params.id;

    Tarea.findById(id)
        .exec((err, tarea) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tarea
            });
        });
});

// ============================
// Buscar tareas
// ============================
app.get('/tareas/buscar/:termino', (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Tarea.find({ titulo: regex })
        .exec((err, tarea) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tarea
            });
        });

});


// ============================
// Crear una nueva tarea
// ============================
app.post('/tareas', (req, res) => {

    let body = req.body;

    let tarea = new Tarea({
        titulo: body.titulo,
        descripcion: body.descripcion,
        creacion: body.creacion,
        minutos: body.minutos,
        segundos: body.segundos,
        terminado: body.terminado,
        duracion: body.duracion,
        fecha: body.fecha
    });

    tarea.save((err, tareaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            tarea: tareaDB
        });
    });

});

// ============================
// Borrar una tarea
// ============================
app.delete('/tareas/:id', (req, res) => {

    let id = req.params.id;

    Tarea.findByIdAndRemove(id, (err, tareaBorrada) => {

        if (err || tareaBorrada === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Tarea no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            producto: tareaBorrada,
            message: 'Tarea Borrada'
        });
    });
});

// ============================
// Actualizar tarea
// ============================
app.put('/tareas/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Tarea.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, tareaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            tarea: tareaDB
        });
    });
});

// ============================
// Precarga la base de datos
// ============================
app.get('/precargar', (req, res) => {
    Tarea.collection.deleteMany(function(err) {
        if (err) throw err;
    });

    let status = GeneraRandom.generaAleaorios();

    if (status != true) {
        return res.status(500).json({
            ok: false
        });
    }
    res.json({
        ok: true,
        mensaje: 'Base precargada con 50 registros'
    });

});

module.exports = app;