import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import Setting from '@/models/Setting';

export async function sendWelcomeEmail(userEmail: string, password: string, userName: string) {
  await dbConnect();
  const smtpSetting = await Setting.findOne({ key: 'smtp_config' });

  if (!smtpSetting) {
    throw new Error('SMTP is not configured. Please configure it in Settings.');
  }

  const { host, port, user, pass, fromName, fromEmail } = smtpSetting.value;

  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(port),
    secure: port === '465', // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: userEmail,
    subject: 'Welcome to Nooryak - Your Account Details',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #ff7a18;">Welcome to Nooryak, ${userName}!</h2>
        <p>Your account has been created by the administrator. Here are your login credentials:</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Password:</strong> ${password}</p>
        </div>
        <p>Please log in and change your password for security.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888;">This is an automated message. Please do not reply to this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function checkSMTPConfig() {
  await dbConnect();
  const smtpSetting = await Setting.findOne({ key: 'smtp_config' });
  return !!smtpSetting;
}
