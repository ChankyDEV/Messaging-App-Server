const database = require('../../db')
const User = require('../../models/user')
const ErrorMessage = require('../../models/error_message')


exports.registerInputsAreWrong = function (email, phone, password) {
    if(typeof email === 'undefined' || typeof phone === 'undefined' || typeof password === 'undefined' || email == '' || phone == '' || password == '') {
        return true
    } else {
        return false
    }
}
exports.loginInputsAreWrong = function (emailOrPhone, password) {
    if(typeof emailOrPhone === 'undefined' || typeof password === 'undefined' || emailOrPhone == '' || password == '') {
        return true
    } else {
        return false
    }
}

exports.userIsNotInDatabase = async function (email, phone) {
    const db = await database.client
    const queryEmail = {
        email:email
    }
    const queryPhone = {
        phone:phone
    }
    const resultEmail = await db.collection('users').find(queryEmail).toArray()
    const resultPhone = await db.collection('users').find(queryPhone).toArray()
    if(resultEmail.length > 0 || resultPhone.length > 0) {
        return false;
    } else {
        return true;
    }
}