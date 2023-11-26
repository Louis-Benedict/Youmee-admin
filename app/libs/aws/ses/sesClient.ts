import SES from 'aws-sdk/clients/ses'
import config from './config'

const ses = new SES({ apiVersion: '2010-12-01' })

export const sendEmail = (
    toMail: string,
    subject: string,
    template: string
) => {
    const params = {
        Destination: {
            ToAddresses: [toMail],
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: template,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            },
        },
        Source: `Youmee <${config.senderEmail}>`,
    }

    ses.sendEmail(params, (err, data) => {
        if (err) {
            return console.log(err, err.stack)
        } else {
            console.log('Email sent.', data)
        }
    })
}
