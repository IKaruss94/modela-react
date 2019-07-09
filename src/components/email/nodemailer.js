//"use strict";
//import React from 'react'
//const nodemailer = require('nodemailer')
import nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
async function main(){
    // [] gmail api key for ikaruss94@gmail.com
        const clientID = '691625379421-8ehe8duq3k8coeds4a81ngsd9kd0g73g.apps.googleusercontent.com';        
        const clientSeacret = 'fqKUIQLkB-Y0675m2-leMepW';

    // []
        const data_recipiant = 'ivars.knets@gmail.com';
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
    
    // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                clientId: clientID,
                clientSecret: clientSeacret,
            }
        });

    // []
        transporter.verify(function(error, success) {
            if (error) {
                console.log("Server connection FAILED: ", error);
            } else {
                console.log("Server connection VERIFYED: ", success);
            }
        });

    // []
        transporter.on('token', token => {
            console.log('A new access token was generated');
            console.log('User: %s', token.user);
            console.log('Access Token: %s', token.accessToken);
            console.log('Expires: %s', new Date(token.expires));
        });

    // send mail with defined transport object
        let info = await transporter.sendMail({    
            from: 'modela.lv@gmail.com',
            to: data_recipiant,
            subject: 'Message',
            text: 'I hope this message gets through!',
            html: (<b>Hello world!</b>),
            auth: {
                user: 'user@example.com'
            }
        });
    
    //
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);