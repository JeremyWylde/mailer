const express = require("express");
const nodeMailer = require('nodemailer');
const bodyParser = require("body-parser");

const app = express();
const server = require('http').Server(app);


const urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', (req,res) => {
    res.send('Hello World!');
});

app.post('/sentmessage', urlencodedParser, function (req, res) {
    if (!req.body)
        return res.sendStatus(400);

    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jeremywyldejw@gmail.com',
            pass: '200819930824m'
        }
    });

    let mailOption = {
        from: 'jeremywyldejw@gmail.com',
        to: 'ammotx@gmail.com',
        subject: 'Someone send u a message',
        text: `name: ${req.body.name} email: ${req.body.email} 
        message: ${req.body.message}`
    };

    transporter.sendMail(mailOption, (err, data) => {
        if (err) {
            console.log('Error', err);
        } else {
            console.log('Email sent');
        }
    });

    res.send(req.body);
});

let port = process.env.PORT || 3010;

server.listen(port, (err)=>{
    if(err){
        throw Error(err);
    }
    console.log('Сервер запущен')
});
