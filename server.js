const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Twilio credentials
const accountSid = 'AC3fbb9ef023cce4b17cba72e4a57e1a28'; // Replace with your Twilio Account SID
const authToken = 'e1f83f83e1ee8b44c0ed2f56d1ca9f86'; // Replace with your Twilio Auth Token
const twilioPhoneNumber = '+14155238886'; // Replace with your Twilio phone number

const client = twilio(accountSid, authToken);

// Endpoint to send WhatsApp message
app.post('/send-whatsapp', (req, res) => {
    const { authCode, userPhoneNumber } = req.body;

    // Send WhatsApp message
    client.messages.create({
        from: `whatsapp:${twilioPhoneNumber}`,
        to: `whatsapp:${userPhoneNumber}`,
        body: `Your authentication code is: ${authCode}`
    })
    .then(message => {
        console.log('WhatsApp message sent:', message.sid);
        res.status(200).send('WhatsApp message sent successfully');
    })
    .catch(error => {
        console.error('Error sending WhatsApp message:', error);
        res.status(500).send('Error sending WhatsApp message');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
