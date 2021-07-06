const express = require('express')
const router = express.Router()
const Registro = require('../model/Registro')

/************************************************** 
 * Lista todos os registros
 * GET /registros
***************************************************/
//Códigos de erros:
//200 - Quando deu tudo certo
//404 - Quando o erro esta no clint EX:(o client está requisitando algo que não existe)
//500 - Quando o erro é do lado do servidor

router.get('/', async(req, res) => {
    try {
        // Equivale ao "Select * from" de um Banco de dados
        const registro = await Registro.find()//.find()= Filtrar os status e Traser somente os registro que estão "ativo"
        res.json(registro)//estou dando uma resposta no formato json
    }catch (err) {
        res.status(500).send({
            errors: [{message: ' Não foi possível obter os registros!'}]
        })
    }
})

module.exports = router