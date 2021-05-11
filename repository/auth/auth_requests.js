const database = require('../../db')
const User = require('../../models/user')
const ErrorMessage = require('../../models/error_message')
const encoding = require('./encryption')

exports.saveUser = async function(userDto) {
    const db = await database.client
    try {
        
        userDto['password'] = await encoding.encryptPassword(password,10)
        let result = (await db.collection('users').insertOne(userDto)).ops[0]
        return takeUserFromResult(result,true)
    } catch (err) {
        console.log(err)
        return new ErrorMessage('ERROR_USER_ADDING','Error occured while trying to add new user')
    }   
}
exports.getUser = async function(emailOrPhone, password, isEmail) {
    const db = await database.client
    let query = {}
    if(isEmail){
        query = {
            email:emailOrPhone,
        }
    } else {
        query = {
            phone:emailOrPhone,
        }
    }
    
    let result = {}
    try {      
        result = await db.collection('users').findOne(query)
    } catch (err) {
        return new ErrorMessage('ERROR_USER_GETTING','Error occured while trying to get new user with info' + err)
    }
    if(result==null){
        return new ErrorMessage('ERROR_USER_GETTING','User with specific credentials does not exists in database')
    } else {
        passwordsAreTheSame = await encoding.decryptPassword(result,password)
        if(passwordsAreTheSame) {
            return takeUserFromResult(result,false)  
        } else {
            return new ErrorMessage('ERROR_WRONG_CREDENTIALS','Wrong email or password')
        }
    }
}
function takeUserFromResult(result,empty) {
    if(empty==true) {
        return new User(result['_id'],result['email'],result['phone'],'',false,'GenderEnum.none',[''])
    } else {
        return new User(result['_id'],result['email'],result['phone'],result['name'],result['hasOwnImage'],result['gender'],result['contactUids'])
    }
    
}

async function decryptPassword(result,password) {
    return await bcrypt.compare(password,result['password'])
}
async function encryptPassword(password,salt) {
        return await bcrypt.hash(password,salt)
}