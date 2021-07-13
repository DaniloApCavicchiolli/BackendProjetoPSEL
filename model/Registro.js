const mongoose = require('mongoose')//para fazer a conexão com o banco de dados

const RegistroSchema = mongoose.Schema({
    nome: {
        type: String,
        unique: true,
        require: true
    },
    status: {
        type: String,
        enum: ['ativo','inativo'],
        default: 'ativo'
    },
    cpf: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true
    },
    senha: {
        type: String,
        require: true,
        unique: true
        //select: false
    },
    nivel: {
        type: Number
    },
    foto: {
        originalname: {type: String},
        path: {type: String}
    }
}, {timestamps: true})

module.exports = mongoose.model('registro', RegistroSchema)