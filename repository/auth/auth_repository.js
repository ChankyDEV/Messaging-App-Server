const helpers = require('./auth_helpers')
const requests = require('./auth_requests')
const ErrorMessage = require('../../models/error_message')


exports.signUp = async function(userDto){
    email = userDto['email']
    phone = userDto['phone']
    password = userDto['password']

    if(helpers.registerInputsAreWrong(email,phone,password)) {
        return new ErrorMessage('ERROR_DATA_UNDEFINED','Some data has invalid value')
    } else {       
        
        canSignUpUser = await helpers.userIsNotInDatabase(email,phone)
        if(canSignUpUser) {          
            return await requests.saveUser(userDto)

        } else {
            return new ErrorMessage('ERROR_USER_EXISTS','User already exists')
        }
    }
}

exports.signInEmail = async function(email, password){  
    return await signIn(email,password,true)
}

exports.signInPhone = async function(phone, password){  
    return await signIn(phone,password,false)
}

async function signIn(phoneOrEmail,password,isEmail)  {
    if(helpers.loginInputsAreWrong(phoneOrEmail,password)) {
        return new ErrorMessage('ERROR_DATA_UNDEFINED','Some data has invalid value')
    } else {
        let canSignInUser;
        if(isEmail==true) {
            canSignInUser = await helpers.userIsNotInDatabase(phoneOrEmail,'no phone')  
        } else {
            canSignInUser = await helpers.userIsNotInDatabase('no email',phoneOrEmail)  
        }       
        if(canSignInUser) {          
            return new ErrorMessage('ERROR_USER_NOT_EXISTS','User with specific credentials does not exists in database')
        } else {           
            return await requests.getUser(phoneOrEmail,password,isEmail)
        }
    }
}



