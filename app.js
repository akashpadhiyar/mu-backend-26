const express = require('express');
var mongoose = require('mongoose')

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
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/addData', (req, res) => {
  
    //Save Data in DB
     ProductModel.create(req.body)
        .then(() => {
            res.json({flag:1,msg:"Record Added"});
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
    .then(data=>{
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