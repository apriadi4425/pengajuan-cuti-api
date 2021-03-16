const models = require('../models')

const AddListPegawaiReminder = (data) => {
    return new Promise((resolve, reject) => {
        models.ReminderListPegawai.bulkCreate(data)
            .then(res => {
                resolve('sukses')
            }).catch(e => {
                reject(e)
            })
    })
}

exports.getReminder = (req, res) => {
    models.Reminder.findAll({include : 'pegawai', where : { status : req.query.status }}).then(result => {
        res.send({
            status : 200,
            data : result
        })
    }).catch(err => {
        res.status(500).send({
            status : 500,
            data : err
        })
    })
}

exports.createReminder = (req, res) => {
    const { tanggal, judul, keterangan, list_pegawai, jenis } = req.body

    models.Reminder.create({ jenis : jenis, tanggal: tanggal, judul: judul, keterangan : keterangan, status : 1})
        .then(result => {
            let NewData = []
            list_pegawai.forEach(item => {
                NewData.push({
                    id_reminder: result.dataValues.id,
                    id_pegawai: item.value,
                    nama_pegawai : item.label
                })
            })

            AddListPegawaiReminder(NewData)
                .then(result2 => {
                    res.send({
                        status : 200,
                        data : 'sukses'
                    })
                }).catch(err2 => {
                    models.Reminder.destroy({where : {id : result.dataValues.id}})
                    res.send({
                        status : 500,
                        data : err2
                    })
                })
        })
}

exports.deleteReminder = (req, res) => {
    const IdReminder = req.body.id;
    models.Reminder.destroy({where : {id : IdReminder}})
        .then(result => {
            res.send({
                status : 200,
                data : 'sukses'
            })
        }).catch(err => {
            res.send({
                status : 500,
                data : err
            })
    })
}
