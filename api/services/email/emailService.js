import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';

sgMail.setApiKey(process.env.SENDGRID_API);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'siguranmajstor@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const emailService = async (to, subject, template, attachment, name) => {
  let currentAttachment = false;
  // Dont send email if we are in test
  if (process.env.NODE_ENV === 'test') return null;

  if (attachment) {
    currentAttachment = readFileSync(attachment).toString('base64');
  }

  const attachments = currentAttachment
    ? [
        {
          content: currentAttachment,
          filename: `${name}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ]
    : [];

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
    html: template,
    attachments,
  };

  try {
    await sgMail.send(mailOptions);
  } catch (error) {
    console.log('error', error);
    // await transporter.sendMail(mailOptions)
  }
};

export const sendEmailService = async (to, subject, template) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
    html: template,
  };

  try {
    // await sgMail.send(mailOptions);
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('sendEmailServiceerror', error);
    // await transporter.sendMail(mailOptions)
  }
};
