const express = require('express');
var mongoose = require('mongoose')
var cors = require('cors')
var fileupload = require('express-fileupload')
//MongoDB Connection Start
mongoose.connect('mongodb://127.0.0.1:27017/mudb2')
    .then(() => console.log("DB Connected"))
    .catch(() => console.log("Error in DB Connection"))
//MongoDB Connection End

var ProductModel = require('./models/Product')
const app = express();
const port = 3000;
app.use(express.static('public'))
app.use(express.json())
app.use(cors())
app.use(fileupload())

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/maildemo',async (req, res)  => {

    const nodemailer = require("nodemailer");
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
        auth: {
            user: "akash.padhiyar@gmail.com",
            pass: "bgrb rdnh quek",
        },
    });
    try {
        const info = await transporter.sendMail({
            from: '"Example Team" <team@example.com>', // sender address
            to: "akash@gmail.com", // list of recipients
            subject: "Mern Stack Workd", // subject line
            text: "Hello world?", // plain text body
            html: "<b>How was the Workshop ? </b>", // HTML body
        });

        res.send("Email Sent")
        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
});

app.post('/fileupload', (req, res) => {
    console.log(req.files.file123)
    var myfile = req.files.file123;
    myfile.mv(("public/uploads/" + myfile.name), function () {
        res.send("File Uploaded")
    })
});

app.post('/addData', (req, res) => {

    //Save Data in DB
    ProductModel.create(req.body)
        .then(() => {
            res.json({ flag: 1, msg: "Record Added" });
        })
});



app.get('/saveData', (req, res) => {
    var userdata = {
        pname: "iphone",
        pprice: 999,
        pdetails: "NicePhone"
    }
    //Save Data in DB
    var mydata = ProductModel(userdata)
    mydata.save()
        .then(() => {
            res.send("Data Saved")
        })
});


app.get('/getdata', (req, res) => {
    ProductModel.find()
        .then(data => {
            res.json(data)
        })
});


app.get('/homepage', (req, res) => {
    res.sendFile(__dirname + '/home.html')
});

app.get('/aboutpage', (req, res) => {
    res.sendFile(__dirname + '/about.html')
});



app.get('/cake/', (req, res) => {
    res.send("Cake")
});

app.get('/cake/ahmedabad', (req, res) => {
    res.send("Cake Ahmedabad")
});

//http://127.0.0.1:3000/product/mobile
app.get('/product/:id', (req, res) => {
    var search = req.params.id
    res.send("Product" + id)
});


//http://127.0.0.1:3000/search?q=Laptop
app.get('/search/', (req, res) => {
    var id = req.query.q
    res.send("Search Keyword is " + id)
});

app.get('/contactpage', (req, res) => {

    res.sendFile(__dirname + '/contact.html')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});