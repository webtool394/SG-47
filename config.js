// multi smtp only duplicate as many objects as possible
exports.smtp = [
	{
		host : "email-smtp.us-west-2.amazonaws.com",
		port : "587",
		auth : true, 
		user  : "AKIAWZ4FXMOCMJSNSR5M",
		pass : "BNCL9YH6on1+ObDIoUQ/tZ6AdJGLVD6A4O9oZI7wTFyB"
    }
];

// Message Info
exports.message = [
	{
	fromName	: "Done DOO",
		fromEmail	: "connect@homemadefood.app",
		replyTo	: "addmins@mortgaggeloans.com",
	subject		: "NO OF",
	}
];

// Multy shortlink
exports.shortlink = [
	'https://google.com/',
	'https://javhd.com/',
	'https://facebook.com/',
	'https://yahoo.com',
	'https://youtube.com'
]

exports.send = {
	delay			: 0, // Seconds per send
	pauseAfter		: 0, // Pause after how many emails
	pauseFor		: 0, // Pause for how many seconds
	useHeader		: true, // if true it will use High importance.
	useAttach		: false, // if true it will use the attachment that is set in the attachment
	useHttpProxy	: false, // if true then send will use the http proxy that has been set
	text			: "this is the text version", // this is the text version of the html letter, it will be displayed if the html cannot be displayed
	letter 			: "letter.html", // HTML Message
	list 			: "emails.txt"  // Emails File Name
};

exports.proxy = {
	http 	: "127.0.0.1:1080" // Proxy
};

exports.attach = {
file 	: "Rem-{random_number_6}.htm" // Attach File can be pdf or anything
};

exports.custom_headers = {
    "x-priority": "1",
    "x-msmail-priority": "High",
    importance: "high"
};
