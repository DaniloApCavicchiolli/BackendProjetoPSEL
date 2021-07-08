const express = require('express')
const router = express.Router()
const Registro = require('../model/Registro')

/************************************************** 
 * Lista todos os registros
 * GET /registros
***************************************************/
//Códigos de erros:
//200 - Quando deu tudo certo
//404 - Quando o erro esta no client EX:(o client está requisitando algo que não existe)
//500 - Quando o erro é do lado do servidor

router.get('/', async(req, res) => {
    try {
        // Equivale ao "Select * from" de um Banco de dados
        const registro = await Registro
                                .find()//.find()= Filtrar os status e Traser somente os registro que estão "ativo"
                                .sort({nome: 1})//.sort({nome: 1}) ordenando pelo nome, "1" ordem ascendente e "-1" ordem descendente 
        res.json(registro)//estou dando uma resposta no formato json
    }catch (err) {
        res.status(500).send({
            errors: [{message: ' Não foi possível obter os registros!'}]
        })
    }
})

/************************************************** 
 * Lista um registro pelo id
 * GET /registros/:id = passando o id, ele intende que é um parâmetro que vai ser passado
***************************************************/
router.get('/:id', async(req, res) => {
    try {
        const registro = await Registro.findById(req.params.id)
        res.json(registro)
    } catch (error) {
        res.status(500).send({
            errors: [{message: `Não foi possível obter o registro com o id ${req.params.id}`}]
        })
    }
})

/************************************************** 
 * Inclui um novo registro
 * POST /registros
***************************************************/
router.post('/', async(req, res) => {
    const { nome } = req.body
    let registro = await Registro.findOne({nome})
    if(registro){
        return res.status(200).json({
            errors: [{message: "Já existe um registro com o nome informado"}]
        })
    }
    try {
        let registro = new Registro(req.body)
        await registro.save()
        res.send(registro)
    } catch (error) {
        return res.status(500).json({
            errors: [{message: `Erro ao salvar o registro: ${error.message}`}]
        })
    }
})

/************************************************** 
 * Remove um registro pelo id
 * DELETE /registros/:id
***************************************************/
router.delete('/:id', async(req, res) => {
    await Registro.findByIdAndRemove(req.params.id)
    .then(registro => {
        res.send({message: `Registro ${registro.nome} removido com sucesso!`})
    }).catch(error => {
        return res.status(500).send({
            errors: [{message: `Não foi possível apagar o registro com o id: ${req.params.id}`}]
        })
    })
})

/************************************************** 
 * Edita o registro
 * PUT /registros
***************************************************/
router.put('/', async(req, res) => {
    let dados = req.body
    await Registro.findByIdAndUpdate(req.body._id, {
        $set: dados
    }, {new: true})//true = mostra os dados que foram alterados
    .then(registro => {
        res.send({message: `Registro ${registro.nome} alterado com sucesso!`})
    }).catch (error => {
        return res.status(500).send({
            errors: [{message: `Não foi possível alterar o registro com o id: ${req.body._id}`}]
        })
    })
})

module.exports = router