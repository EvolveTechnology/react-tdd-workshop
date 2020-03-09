const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  debug: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const createTemplate = text => `
	<div className="email" style="
		border: 1px solid black;
		padding: 20px;
		font-family: sans-serif;
		line-height: 1.5;
		font-size: 20px;
	">
		<h2>Hi!</h2>
		<p>${text}</p>

		<p>☕☕☕</p>
	</div>
`;

transport.verify(function(error) {
  if (error) {
    console.log("Error with e-mail server");
    console.log(error);
  } else {
    console.log("E-mail service is ready");
  }
});

exports.transport = transport;
exports.createTemplate = createTemplate;
