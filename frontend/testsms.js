const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "4e2a6b4d",
  apiSecret: "FTf3i6bjKBr7opby"
});

const from = "Vonage APIs"
const to = "639923927522"
const text = 'A text message sent using the Vonage SMS API'

async function sendSMS() {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

sendSMS();