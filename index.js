const express = require('express')
require('dotenv').config()
const InicializaMongoServer = require('./config/Db')

const rotasRegistro = require('./routes/Registro')
const rotasLogin = require('./routes/Login')

//Inicializamos o servidor MongoDB
InicializaMongoServer()

const app = express()

//Removendo por segurança
app.disable('x-powered-by')

//Porta Default
const PORT = process.env.PORT
// verifica se é um conteudo json, se é válido
app.use(express.json())

/* Middleware do Express*/
 // Ficará entre a "requisição" e a "resposta" observando
 app.use(function(req, res, next) {
    // Em produção, remova o * e atualize com o dominio/ip do seu app
    res.setHeader('Access-Control-Allow-Origin', '*')
    //Exemplo: res.setHeader('Access-Control-Allow-Headers', "Content-Type, Accept, access-token")
    res.setHeader('Access-Control-Allow-Headers', "*")
    //Métodos que serão permitidos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    //Após passar por todos usa o "next()", para ele continuar 
    next()
 })

 

/* estrutura padrão. Caminho inicial */
app.get('/', (req, res) => {
    const idiomas = req.headers['accept-language']
    res.json({mensagem: "API projetoPSEL 100% funcional!! *.*",
                versão: '1.0.0'})
})

/* Rotas do registro */
app.use('/registros', rotasRegistro)

/* Rotas do login */
app.use('/login', rotasLogin)

/* Rota para tratar exceções - normalmente 404 - DEVE SER A ÚLTIMA ROTA "SEMPRE" */
app.use(function(req, res) {
    res.status(404).json({message: `A rota ${req.originalUrl} não existe.`})
})

//Iniciando meu servidor na porta {PORT}
app.listen(PORT, (req, res) => {
    console.log(`Servidor web iniciado na porta ${PORT}`)
})