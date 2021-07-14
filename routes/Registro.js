const express = require('express')
const router = express.Router()
const Registro = require('../model/Registro')

/************************************************** 
 * Lista todos os registros
 * GET /registros
***************************************************/
router.get('/', async(req, res) => {
    try {
        const registro = await Registro
                                .find()
                                .sort({nome: 1})
        res.json(registro)//estou dando uma resposta no formato json
    }catch (err) {
        res.status(500).send({
            errors: [{message: ' Não foi possível obter os registros!'}]
        })
    }
})

/************************************************** 
 * Lista um registro pelo id
 * GET /registros/:id
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
        return res.status(400).json({
            errors: [{message: "Já existe um registro com o nome informado"}]
        })
    }
    try {
        let registro = new Registro(req.body)
        await registro.save()

        registro.senha = undefined;

        res.send(registro)
    } catch (error) {
        return res.status(400).json({
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