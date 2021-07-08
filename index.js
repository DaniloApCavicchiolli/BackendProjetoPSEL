const express = require('express')
//exige esta sintaxe para ler os arquivos de configurações. Carrega as váriaveis de ambiente 
require('dotenv').config()
const InicializaMongoServer = require('./config/Db')
//Definindo as rotas da aplicação
const rotasRegistro = require('./routes/Registro')
const rotasUpload = require('./routes/UserImage')

//Inicializamos o servidor MongoDB
InicializaMongoServer()

const app = express()

//Removendo por segurança
app.disable('x-powered-by')

//Porta Default
const PORT = process.env.PORT
app.use(express.json())// verifica se é um conteudo json, se é válido

/* Middleware do Express*/
 // Ficará entre a "requisição" e a "resposta" observando
 // next = É para ele continuar ou não
 app.use(function(req, res, next) {
    // Em produção, remova o * e atualize com o dominio/ip do seu app
    // * = permite que qualquer origem acesse o meu servidor
    res.setHeader('Access-Control-Allow-Origin', '*')//Consulta de qualquer origem
    //Cabeçalhos da requisição que serão permitodos
    //Exemplo: res.setHeader('Access-Control-Allow-Headers', "Content-Type, Accept, access-token")
    res.setHeader('Access-Control-Allow-Headers', "*")//De qualquer cabeçalho
    //Métodos que serão permitidos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')//Usando todos os métodos
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

/* Rotas de upload */
app.use('/userImage', rotasUpload)

/* Rota para tratar exceções - normalmente 404 - DEVE SER A ÚLTIMA ROTA (SEMPRE) */
app.use(function(req, res) {
    res.status(404).json({message: `A rota ${req.originalUrl} não existe.`})
})

//Iniciando meu servidor na porta {PORT}
app.listen(PORT, (req, res) => {
    console.log(`Servidor web iniciado na porta ${PORT}`)
})