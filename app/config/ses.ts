import { config } from './config'

export function sesConfig(toMail: string, subject: string, template: string) {
    return {
        Destination: {
            ToAddresses: [toMail],
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: template,
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: 'TEXT_FORMAT_BODY',
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            },
        },
        Source: `Youmee <${config.emailAddress}>`,
    }
}
