const models = require('../models');

const GetAllUser = async (req, res) => {
    models.User.findAll({raw : true}).then(result => {
        res.status(200).send({
            status : 200,
            data : result
        })
    }).catch(e => {
        res.status(500).send({
            status : 500,
            data : e
        })
    });
}

module.exports = { GetAllUser }
