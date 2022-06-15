const jswt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise ( (resolve, reject ) => {
        const payload = { uid } ;

        jswt.sign ( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token ) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve( token );
        })
    })

}

module.exports = {
    generarJWT
}