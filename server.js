const express = require('express');
const authController = require('./controllers/auth_controller')
const app = express()
const port = 3000
const serverIP = '192.168.0.107'


app.use(express.json({ extended: true }));
app.post('/auth/signUp', authController.singUpEndpoint)
app.post('/auth/signInEmail', authController.singInEmailEndpoint)
app.post('/auth/signInPhone', authController.singInPhoneEndpoint)
  
app.listen(port,serverIP,()=>{
    console.log('Listening on port: '+port)
})
