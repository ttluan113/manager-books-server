const express = require('express');
const cors = require('cors');
const route = require('./route/index');
const connectDB = require('./config/connect');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const ModelUser = require('./Model/ModelUser');
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
route(app);

connectDB();

const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

app.post('/api/email', (req, res) => {
    ModelUser.findOne({ masinhvien: req.body.email }).then((dataUser) => {
        if (dataUser) {
            const emailUser = dataUser.email;
            const sendMail = async () => {
                try {
                    const accessToken = await oAuth2Client.getAccessToken();
                    const transport = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            type: 'OAuth2',
                            user: 'Hanpage4@gmail.com',
                            clientId: CLIENT_ID,
                            clientSecret: CLIENT_SECRET,
                            refreshToken: REFRESH_TOKEN,
                            accessToken: accessToken,
                        },
                    });
                    const info = await transport.sendMail({
                        from: '"Thông Báo Sách Sắp Hết Hạn" <Hanpage4@gmail.com>', // sender address
                        to: emailUser, // list of receivers
                        subject: 'Thanks', // Subject line
                        text: 'Hello world?', // plain text body
                        html: `<b>
                        Dear ${emailUser}
                        Alibarbie sincerely thanks you for choosing to trust and purchase our products.
                        We would like to extend our heartfelt thanks to you for choosing to shop with us. This is greatly appreciated by us, and we are delighted to have the opportunity to serve you.
                        Your trust and selection of our products/services not only show your support but also inspire us to continuously improve and provide the best experiences for our customers.
                        If you have any questions about your order or need further assistance, please contact us at Email. We are always ready to assist you.
                        Once again, we sincerely thank you for accompanying us on this journey. We look forward to serving you again in the future.
                        Best regards,
                        Alibarbie</b>`,
                    });
                } catch (error) {
                    console.log('Error sending email:', error);
                }
            };
            sendMail();
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
