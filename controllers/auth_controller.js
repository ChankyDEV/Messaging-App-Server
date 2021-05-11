const auth = require('../repository/auth/auth_repository')
const MyResponse = require('../models/response_object')
const User = require('../models/user')
const { json } = require('body-parser')

exports.singUpEndpoint = async function (req,res) { 
    let code = 201
    const userDto = req.body
    const responseBody = await auth.signUp(userDto)
    sendData(res,responseBody,code)
}

exports.singInEmailEndpoint = async function (req,res) {
    let code = 201
    const {email,password} = req.body
    const responseBody = await auth.signInEmail(email,password)
    sendData(res,responseBody,code)
}

exports.singInPhoneEndpoint = async function (req,res) {
    let code = 201
    const {phone,password} = req.body
    
    const responseBody = await auth.signInPhone(phone,password)
    sendData(res,responseBody,code)
}

function sendData(response,responseBody,code){
    let result = new MyResponse(false,responseBody)
    if(result['responseBody'] instanceof User) {
        result['wentWell'] = true
    } else {
        result['wentWell'] = false
        code = 200
    }
    response.status(code).send(JSON.stringify(result)) 
}

