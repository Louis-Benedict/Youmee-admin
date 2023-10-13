import { config } from '@/app/config/config';
import { Mail } from './email';

const html_template = (otp: string) => `
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Youmee</a>
    </div>\
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you . Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <a href="${config.baseUrl}/reset-password/${otp}">Set new password</a>
    <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Koding 101 Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>
`;

export default function recoveryMail(recipient: string, otp: string): Mail {
	return {
		to: recipient,
		from: process.env.SENDGRID_SENDER as string,
		subject: 'Youmee - Password Reset',
		text: 'test',
		html: html_template(otp),
	};
}
