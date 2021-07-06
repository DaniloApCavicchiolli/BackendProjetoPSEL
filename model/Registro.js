const mongoose = require('mongoose')//para fazer a conexão com o banco de dados

//Criando o Schema Cadastro. É equivalente a uma tabela
//Estou usando uma classe chamada Schema, para criar a estrutura do meu schema
const RegistroSchema = mongoose.Schema({
    nome: {
        type: String,
        unique: true //Criamos um índice único. Não quero dois cadastro com o mesmo nome
    },
    status: {
        type: String,
        enum: ['ativo','inativo'],
        default: 'ativo'
    },
    cpf: {
        type: String,
        unique: true
    },
    email: {
        type: String,
    },
    Senha: {
        type: String
    }
}, {timestamps: true})// faz o controle automático da data que foi criado o registro

//Vai criar um modelo no MongoDB com o nome "registros" utilizando com base o meu CadastroSchema
module.exports = mongoose.model('registro', RegistroSchema)