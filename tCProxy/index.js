const express = require('express')
var cors = require('cors')
const app = express();
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: 'API_KEY',
});

//TODO write array to file

app.use(cors(), express.json())
capsules = [];
dates = [];

class Capsule {
    constructor(email, message, date, file) {
        this.email = email;
        this.message = message;
        this.date = date;
        this.file = file;
        console.log("New Capsule");
    }
    SendFile() {
        mg.messages
            .create("MAILGUN_ADDRESS", {
                from: "Mailgun Sandbox <MAILGUN_DOMAIN>",
                to: [this.email],
                subject: "Time Capsule",
                text: this.message,
                attachment: this.file,
            })
            .then(msg => console.log(msg)) // logs response data
            .catch(err => console.log(err)); // logs any error`;

    }
}


app.post('/', function (req, res, next) {
    //res.json({requestBody: req.body}) 
    newCapsule = new Capsule(req.body.email, req.body.message, Date.parse(req.body.date), req.files);
    capsules.push(newCapsule);
    dates.push(Date.parse(req.body.date));
    //console.log(Date.parse(req.body.date))
    console.log("new capsule")



    res.send("Done")
})


app.listen(3000, () =>
    console.log("Started"),
);
let i = 0;
setInterval(() => {
    for (let i = 0; i < dates.length; i++) {
        console.log(dates[i]);
        console.log(dates[i] - Date.now());
        if (dates[i] <= Date.now()) {
            for (let k = 0; k < capsules.length; k++) {
                if (capsules[i] != null) {
                    if (capsules[k].date <= Date.now()) {
                        capsules[k].SendFile();
                        capsules.splice(k, 1);
                    }
                }
            }
            dates.splice(i, 1);
        }
    }
}, 2000)