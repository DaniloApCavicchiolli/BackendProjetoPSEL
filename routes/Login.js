const express = require('express')
const router = express.Router()
const Registro = require('../model/Registro')

router.post('/', async(req, res) => {
    const { email, senha } = req.body

    try{
        const login = await Registro.findOne({email, senha,"status":"ativo"})

        if(!login) {
            return res.send(401)
        }
        res.send(login)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router