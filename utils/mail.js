var nodemailer = require('nodemailer');
var striptags = require('striptags');

module.exports = { 

	sendMail(to, subject, message)
	{
		var transporter = nodemailer.createTransport(
		{
			host: "smtp.zoho.com",
			port: 465,
			secure: true,
			auth: {
					user: "pruebas@fstack.com.mx",
					pass: "password"
				},
			tls: {
					rejectUnauthorized: false
				}
		});

		transporter.sendMail(
		{
			from: 'pruebas@fstack.com.mx',
			to: to,
			subject: subject,
			text: striptags(message),
			html: message
		}, function(error, info)
		{
			if(error)
			{
				console.log(error);
				return false;
			}
			else
			{
				return true;
			}
		});
	},

	functionName(variable)
	{
		var subject = "Subject"
		var message = "Mensaje";
		var result = this.sendMail(email,subject,message);
		return result;
	}
};