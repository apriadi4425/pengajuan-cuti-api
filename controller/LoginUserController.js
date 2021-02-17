const models = require('../models');
const jwt = require("jsonwebtoken");
var md5 = require('md5');




const accessTokenSecret = process.env.SECRET_KEY;

const CobaLogin = async (req, res) => {

    const User = await models.User.findOne({
        where : {
            username : req.body.username,
            password : md5(req.body.password)
        }
    })

    if(User !== null){
        const DataUser = User.dataValues;
        const accessToken = jwt.sign({ username: DataUser.username,  otoritas: DataUser.otoritas }, accessTokenSecret);
        res.status(200).send({
            status : 200,
            data : {
                username : DataUser.username,
                nama : DataUser.nama,
                token : accessToken
            }
        })
    }else{
        res.status(401).send({
            status : 401,
            data : {
                message : 'Username atau password salah'
            }
        })
    }

}

module.exports = { CobaLogin }
