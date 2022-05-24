"use strict";
const nodemailer = require("nodemailer");
const moment = require("moment");
const colors = require("colors");
const fs = require("fs");
const random = require("./random.js");
const config = require("./config.js");
const figlet = require("figlet");

var staticDate = moment().format("YYYYMMDDHHMMSS");

// print logo SG47
console.log(
	colors.rainbow(
		figlet.textSync(" SG47", {
			font: "Ogre",
			horizontalLayout: "default",
			verticalLayout: "default"
		})
	)
);
console.log(
	"                              " + colors.italic("Coder : P05TM4N")
);
console.log("");
// -------------------------------------

const list = fs
	.readFileSync(config.send.list)
	.toString()
	.split("\n");
console.log(
	colors.white(" [+]")+
	colors.blue(
		" Emails list File : " +
		colors.cyan(" " + config.send.list + " ")
	)
);

const html = fs.readFileSync(config.send.letter, "utf-8");

console.log(
	colors.white(" [+]")+
	colors.blue(
		" Message HTML File : " +
		colors.cyan(" " + config.send.letter + " ")
	)
);

console.log(
	colors.white(" [+]")+
	colors.blue(" Starting The Engine ... ... ... ")
);

function getDate() {
	return moment().format("MMM D, hh:mm:ss a");
}

// ganti string
function replace_tags(input, email) {
	return input
		.replace(new RegExp("{email}", "g"), email)
		.replace(new RegExp("{username}", "g"), email.replace(/@[^@]+$/g,""))
		.replace(new RegExp("{domain}", "g"), email.split('@').pop())
		.replace(new RegExp("{date}", "g"), getDate())
		.replace(new RegExp("{random_ip}", "g"), random.ip())
		.replace(new RegExp("{random_country}", "g"), random.country())
		.replace(new RegExp("{random_device}", "g"), random.device())
		.replace(new RegExp("{random_browser}", "g"), random.browser())
		.replace(new RegExp("{random_shortlink}", "g"), randomArray(config.shortlink))
		.replace(new RegExp(/\{random_number_(\d+)\}/, "g"), (_, n) => random.number(n))
		.replace(new RegExp(/\{random_letterup_(\d+)\}/, "g"), (_, n) => random.letterup(n))
		.replace(new RegExp(/\{random_letterlow_(\d+)\}/, "g"), (_, n) => random.letteruplow(n))
		.replace(new RegExp(/\{random_letteruplow_(\d+)\}/, "g"), (_, n) => random.letteruplow(n))
		.replace(new RegExp(/\{random_letternumberuplow_(\d+)\}/, "g"), (_, n) => random.letternumberuplow(n));
}

// random array
function randomArray(array){
  var id = Math.floor(Math.random() * array.length);
  return array[id];
}

// mengganti objek berisi string
function get_customised_message_template(email) {
	var randomArrayMessage = randomArray(config.message);
	return {
		subject: replace_tags(randomArrayMessage.subject, email),
		fromName: replace_tags(randomArrayMessage.fromName, email),
		fromEmail: replace_tags(randomArrayMessage.fromEmail, email),
		replyTo: replace_tags(randomArrayMessage.replyTo, email),
		text: replace_tags(config.send.text, email),
		html: replace_tags(html, email)
	};
}

function kirim (email,cnt) {

	// --------------- multy smtp --------------

	var randomArraySmtp = randomArray(config.smtp);

	var smtp = {
		host: randomArraySmtp.host,
		port: randomArraySmtp.port,
		secure: false
	};

	if (randomArraySmtp.auth) {
		smtp["auth"] = {
			user: randomArraySmtp.user,
			pass: randomArraySmtp.pass
		};
	}

	if (config.send.useHttpProxy) {
		smtp["proxy"] = "http://" + config.proxy.http;
	}


	const transporter = nodemailer.createTransport(smtp);

	// -------------------------------------------

	const random_message = get_customised_message_template(email);

	const message = {
		from: random_message.fromName + "<" + random_message.fromEmail + ">",
		to: email,
		replyTo: random_message.replyTo,
		subject: random_message.subject,
		text: random_message.text,
		html: random_message.html
	};

	if (config.send.useHeader) {
		message.headers = { ...config.custom_headers
		};
	}

	if (config.send.useAttach) {
		message.attachments = {
			path: config.attach.file
		};
	}

	transporter.sendMail(message, (error, info) => {

		if (error) {
			fs.appendFileSync("your-logs/your-failed-"+staticDate+".txt", "failed => "+email);
			return console.log(error);

		}
		if (config.send.useHttpProxy) {
			console.log(
				colors.white(" [+]")+
				colors.cyan(" [" +(cnt+1)+ "/" + list.length + "]") +
				colors.yellow(" [" + getDate() + "]") +
				colors.green(" [Boxed]") +
				colors.white(" [" + randomArraySmtp.user + "]") +
				colors.red(" [http Proxy: " + config.proxy.http + "]") +
				colors.magenta(" [sent to :" + email.replace(/(\r\n|\n|\r)/gm,"") + "]") +
				colors.red(" Delay for " + config.send.delay + " seconds... ")
			);
		} else {
			console.log(
				colors.white(" [+]")+
				colors.cyan(" [" +(cnt+1)+ "/" + list.length + "]") +
				colors.yellow(" [" + getDate() + "]") +
				colors.green(" [Boxed]") +
				colors.white(" [" + randomArraySmtp.user + "]") +
				colors.magenta(" [sent to :" + email.replace(/(\r\n|\n|\r)/gm,"") + "]") +
				colors.red(" Delay for " + config.send.delay + " seconds... ")
			);
			if ((cnt+1) % config.send.pauseAfter === 0) {
				console.log(colors.red(" [+] Paused for "+config.send.pauseFor+" seconds after "+config.send.pauseAfter+" emails"));
			}
		}
	});
};

const timeout = ms => new Promise(res => setTimeout(res, ms))
async function startSend() {
	for (var i = 0; i < list.length; i++) {
		kirim(list[i],i);
		if ( (i%config.send.pauseAfter) == 4) {
			await timeout(config.send.pauseFor*1000);
		}else{
			await timeout(config.send.delay*1000);
		}
	}
}

startSend();
