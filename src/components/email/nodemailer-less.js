


//const nodemailer = require('nodemailer');
//const smtpTransport = require('nodemailer-smtp-transport');
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

// -------------------------------------------------------------------------------

const mailAccountUser = 'modela.noresponse@gmail.com'
const mailAccountPassword = 'pganacpdpirihflx'

let transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: mailAccountUser,
        pass: mailAccountPassword
    },
    tls: {
        rejectUnauthorized: false
    }
}))


const fromEmailAddress = 'modela.noresponse@gmail.com'
const toEmailAddress = 'ivars.knets@gmail.com'

const client_subject = 'Your order with modela.lv';
const client_html =`
    <html>
        <body>

            <header>
                <h3>Title </h3>
                <h4>Order ID: </h4>
                <h4>Order date: </h4>
            </header>

            <h4>Customer info : </h4>
            <table rules="all" cellpadding="5">
            
                <tr>
                    <td><strong>First name : </strong> </td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong>Last name : </strong> </td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong>E-mail : </strong> </td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong>Address : </strong> </td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong>City : </strong> </td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong>ZIP : </strong> </td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong>State : </strong> </td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong>Country : </strong> </td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong>Phone : </strong> </td>
                    <td></td>
                </tr>

            </table><br>

        if( delivery )
        { 
            <h4>Shipping address : </h4>
            <table rules="all" cellpadding="5">
                <tbody>
                    <tr>
                        <td><strong>Full Name : </strong> </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><strong>Address : </strong> </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><strong>City : </strong> </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><strong>ZIP : </strong> </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><strong>State : </strong> </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><strong>Country : </strong> </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            
            <br>
        }
        else
        {                
            <p>No shipping data provided. Client data will be used for shipping info.</p>
        }

        <h4>Payment method : </h4>

        <h4>Order : </h4>
        <table rules="all" cellpadding="5">
            <thead>
                <th>Item code</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </thead>
            <tbody>
                $total_cost = 0;
                foreach($_SESSION['cart'] as $item)
                {                               
                    $sub_total = $item['price'] * $item['qnt'];
                    $total_cost = $total_cost + $sub_total;
                    <tr>
                        <td>' . $item['car_id'] .'-'. $item['num'] . '</td>    
                        <td>'. $item['name'] .'</td>     
                        <td>'. $item['qnt'] .'</td>     
                        <td>'. number_format((float)$sub_total, 2, '.', '') .'</td>           
                    </tr>
                }
            </tbody>

        </table>        
        
        <br>

        <h4>Order Grand Total: EUR '. number_format((float)$total_cost, 2, '.', '') .'</h4>

        </body>
    </html>
`;



let mailClient = {
    from: fromEmailAddress,
    to: toEmailAddress,

    subject: client_subject,
    html: client_html,
}; 


export function SendClientMail ( client_data ){
    console.log('recieved client data: ', client_data);
    
    /*
    transport.sendMail( mailClient, function(error, response){
        if(error){
            console.log('Client E-mail not sent! ', error);
        }else{
            console.log("Client E-mail sent: " + response);
        }
    
        transport.close();
    });
    */
}




// node ./src/Email/nodemailer-less.js

