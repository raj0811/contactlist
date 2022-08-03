const express = require('express');
const path = require('path'); //inbuild module
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();


app.set('view engine', 'ejs'); //tell express that we are using Ejs
app.set('views', path.join(__dirname, 'views')); //setting path
app.use(express.urlencoded());
app.use(express.static('asets'));

// middleware 1
// app.use(function(req, res, next) {

//     console.log('middleware 1 called');
//     next();
// });

// middleware 2
// app.use(function(req, res, next) {

//     console.log('middleware 2 called');
//     next();
// });

var contactList = [{
        name: "raj",
        phone: "7000062656"
    },
    {
        name: "tony",
        phone: "1231231232"
    },
    {
        name: "raj",
        phone: "89896365780"
    }
]


app.get('/', function(req, res) {


    Contact.find({}, function(err, contacts) {

        if (err) {
            console.log("error in fethching contact from db");
            return;
        }
        return res.render('home', {
            title: "My contacts list",
            contact_list: contacts
        });

    })


});

app.get('/practice', function(req, res) {
    return res.render('practice', {
        title: "practice" //change title of page dynamcally
    })
})

app.post('/create-contact', function(req, res) {

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    Contact.create({
            name: req.body.name,
            phone: req.body.phone
        },
        function(err, newContact) {
            if (err) {
                console.log('error in creating a contact');
                return;
            }

            console.log('*******', newContact);
            return res.redirect('back');
        });




});

app.get('/delete-contact', function(req, res) {

    //get the id from url
    let id = req.query.id;

    //find te contact in the database using id and delete it

    Contact.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log("error in deleting an object from db");
            return;
        }
        return res.redirect('back');
    })


});




app.listen(port, function(err) {
    if (err) {
        console.log('Error in running server', err);
    }

    console.log('Express Server is running live ', port);

});