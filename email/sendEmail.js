const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs"); //file system
const path = require("path");


const sendEmail = async (email, subject, payload, template) => {

  try {

    //creation d'un objet transporteur utilisant SMTP 
    const transporter = nodemailer.createTransport({
      //host: process.env.EMAIL_HOST,
      //port: 465,
      service: 'outlook',
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD_SENDER,
      },
    });


    // on va chercher notre fichier template pour le compiler
    const source = fs.readFileSync( template , "utf8");
    const compiledTemplate = handlebars.compile(source);
    
    // configuration d'un objet correspondant aux détails de notre email
    const options = () => {
      return {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: subject ,
        html: compiledTemplate(payload),
      };
    };

    // envoie de l'email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};



module.exports = sendEmail;
