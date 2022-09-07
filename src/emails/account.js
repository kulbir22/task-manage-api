import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        from: 'xeam.kulbir@gmail.com',
        to: email,
        subject: 'Thank you for joining us!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        from: 'xeam.kulbir@gmail.com',
        to: email,
        subject: 'Cancellation',
        text: `We hope to see you soon, ${name}. Let us know why you cancelled the subscription.`
    })
}

export { sendWelcomeEmail, sendCancellationEmail };