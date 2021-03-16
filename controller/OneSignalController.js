const https = require('https');
const models = require('../models')
const {Op} = require('sequelize');
const moment = require('moment');

const Notif = (Title, Message) => {
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic MTU1ZGFmMzAtN2YzMC00Y2I5LWE4ODctNjFmOTBhYTRiNDA5"
    };

    var data = {
        app_id: "d0c69a31-eaa6-47ed-82a0-e17208a6e586",
        headings : {"en" : Title},
        contents: {"en": Message},
        channel_for_external_user_ids: "push",
        include_player_ids: ["cfb32182-8f7e-46fb-ad89-6a80096af828"]
    };

    const options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };


    const req = https.request(options, function(res) {
        res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};

const CekNotifHariIni = async (IdReminder, Judul) => {
    console.log(IdReminder)
    const NotifHariIni = await models.Notifikasi.findAll({
        where : {
            reminder_id : IdReminder,
            tanggal : moment().format('YYYY-MM-DD'),
            status : 2
        }
    })

    if(NotifHariIni.length === 0){
        await Notif('Reminder!!', Judul)
        models.Notifikasi.create({
            reminder_id : IdReminder,
            tanggal : moment().format('YYYY-MM-DD'),
            status : 2
        })
    }
}

const sendNotification = (req, res) => {
    models.Reminder.findAll({
        where : {
            status : 1,
            tanggal : {
                [Op.lte] : new Date()
            },
        }
    }).then(async result => {
        for(item of result){
            CekNotifHariIni(item.id, item.judul)
        }
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}


const getReminder = (req, res) => {
    models.Reminder.findAll({include : 'pegawai', where : { status : 1 }}).then(result => {
        let newData = [];
        result.forEach(item => {
            newData.push({
                id : item.id,
                jenis_reminder : item.jenis === 1 ? 'Kenaikan Pangkat' : 'Kenaikan Gaji Berkala',
                tanggal : moment(item.tanggal).format('DD/MM/YYYY'),
                judul : item.judul,
                keterangan: item.keterangan,
                pegawai : item.pegawai
            })
        })
        res.send({
            status : 200,
            data : newData
        })
    }).catch(err => {
        res.status(500).send({
            status : 500,
            data : err
        })
    })
}

const MatikanReminder = (req, res) => {
    const IdReminder = req.body.id;
    models.Reminder.update({status : 2}, {where : { id : IdReminder }})
        .then(result => {
            res.send({
                status : 200,
                data : 'sukses'
            })
        }).catch(err => {
            res.status(500).send({
                status : 500,
                data : err
            })
        })
}


module.exports = { sendNotification, getReminder, MatikanReminder }
