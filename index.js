const express = require('express')
//exige esta sintaxe para ler os arquivos de configurações. Carrega as váriaveis de ambiente 
require('dotenv').config()
const app = express()
//Porta Default
const PORT = process.env.PORT
app.use(express.json())// verifica se é um conteudo json, se é válido

//estrutura padrão. Caminho Raiz
app.use('/', (req, res) => {
    const idiomas = req.headers['accept-language']
    res.json({mensagem: "API projetoPSEL 100% funcional!! *.*",
                versão: '1.0.0'})
})

//Iniciando meu servidor na porta {PORT}
app.listen(PORT, (req, res) => {
    console.log(`Servidor web iniciado na porta ${PORT}`)
})