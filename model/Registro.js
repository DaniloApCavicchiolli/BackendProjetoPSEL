const mongoose = require('mongoose')//para fazer a conexão com o banco de dados
const bcrypt = require('bcryptjs')

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
        unique: true,
        require: true,
        lowercase: true
    },
    senha: {
        type: String,
        require: true,
        unique: true,
        select: false
    },
    nivel: {
        type: Number
    }
}, {timestamps: true})

RegistroSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10)
    this.senha = hash

    next()
})

module.exports = mongoose.model('registro', RegistroSchema)