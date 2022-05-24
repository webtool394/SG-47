// multi smtp only duplicate as many objects as possible
exports.smtp = [
	{
		host : "email-smtp.us-east-1.amazonaws.com",
		port : "587",
		auth : true, 
		user  : "AKIATNCWU4RHXVR5HKWX",
		pass : "BJM9Aqbv9ZIRNX5mmKLVb5WI4hk+NLLXiOKwhE2t4ttG"
    }
];

// Message Info
exports.message = [
	{
	fromName	: "planner@{domain}",
		fromEmail	: "support@mkt-mail.ithome.com.tw",
		replyTo	: "addmins@mortgaggeloans.com",
	subject		: "Invitiation - New Task Due {date}",
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