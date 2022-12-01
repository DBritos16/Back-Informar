const jwt = require('jsonwebtoken');

const generarJWT = (data)=>{
    return new Promise((resolve, reject) => {
        jwt.sign(data, process.env.SECRET,{
            expiresIn: 60*60
        }, (err, token)=>{
            (err)?reject(err):resolve(token);
        })
    }) 
}

module.exports = generarJWT;