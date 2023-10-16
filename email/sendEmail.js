const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {

  try {

    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD_SENDER,
      },
    });

    const source = fs.readFileSync(template, "utf8");
    const compiledTemplate = handlebars.compile(source);
    
    const options = () => {
      return {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    transporter.sendMail(options(), (error, info) => {
      if (error) {
        throw error;
      } else {
        return;
      }
    });
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
