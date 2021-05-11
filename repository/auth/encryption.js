const bcrypt = require('bcrypt')

exports.decryptPassword = async function(result,password) {
    return await bcrypt.compare(password,result['password'])
}
exports.encryptPassword = async function (password,salt) {
        return await bcrypt.hash(password,salt)
}