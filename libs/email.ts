import nodemailer from 'nodemailer';

interface EmailResponse {
  code: number;
  success: boolean;
  status: string;
  timestamp: Date;
}

const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  secure: true,
  auth: {
    user: 'sanjay.d@wappfoxx.de',
    pass: 'Citrix@123456'
  }
});

export async function SendEmail(toEmail: string, subject: string, text: string): Promise<EmailResponse> {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: 'sanjay.d@wappfoxx.de',
      to: toEmail,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error('Error sending email:', error);
        reject({
          code: 201,
          success: false,
          status: error.message,
          timestamp: new Date()
        });
      } else {
        console.log('Email sent:', info.response);
        resolve({
          code: 200,
          success: true,
          status: info.response,
          timestamp: new Date()
        });
      }
    });
  });
}
