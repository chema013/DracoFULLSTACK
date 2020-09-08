var mongoose = require('mongoose');
const uniqueValidators = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var tareaSchema = new Schema({
    titulo: { type: String, required: [true, 'El titulo es necesario'] },
    descripcion: { type: String, required: [true, 'La descripcion es necesaria'] },
    minutos: { type: Number, required: [true, 'Los minutos son necesarios'] },
    segundos: { type: Number, required: [true, 'Los segundos son necesarios'] },
    creacion: { type: String, required: [true, 'El tiempo de creacion es necesario'] },
    terminado: { type: Boolean, required: [true, 'El estatus de terminado es necesario'] },
    fecha: { type: Object, required: [true, 'Fecha es necesaria'] },
    duracion: { type: Object, required: [false, 'Duracion es necesaria'] }
    // usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

tareaSchema.plugin(uniqueValidators, {
    message: '{PATH} debe ser unico'
});

module.exports = mongoose.model('Tarea', tareaSchema);