const jwt = require('jsonwebtoken');

const validarToken = async (req, res, next) => {

    const token = req.params.token;

    if (!token) {
        return res.status(400).json({
            msg: 'No token received'
        })
    }

    try {
        const { auth } = jwt.verify(token, process.env.SECRET);
        
        if(!auth){
            console.log('token incorrecto');
            return res.status(400).json({
                msg: 'Error al autenticar'
            })
        }

        console.log('token correcto');


    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error de autenticacion'
        })
    }

}

module.exports = validarToken;