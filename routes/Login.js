const express = require('express')
const router = express.Router()
const Registro = require('../model/Registro')
const bcrypt = require('bcryptjs')

router.post('/', async(req, res) => {
    const { email, senha } = req.body

    try{
        const login = await Registro.findOne({ email }, {'status':'ativo'}).select('+senha');

        if(!login) {
            return res.send(400).send({error: 'Email não encontrado'})
        }

        if(!await bcrypt.compare(senha, login.senha)){
            return res.status(400).send({error: 'Senha inválida'})
        }

        // if(login.nivel === 0){
        //     return res.status(400).send({error: 'Usuário desativado'})
        // }

        login.senha = undefined

        res.send(login)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router