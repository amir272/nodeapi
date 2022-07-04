var express = require('express');
var app = express();
var fs = require("fs");
var multer = require('multer');

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//app.use(multer({ dest: '/tmp/' }));
// This responds with "Hello World" on the homepage
app.get('/', function(req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
})

app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

// app.get('/process_get', function(req, res) {
//     // Prepare output in JSON format
//     var response = {
//         first_name: req.query.first_name,
//         last_name: req.query.last_name
//     };
//     console.log(response);
//     //res.end(JSON.stringify(response));
//     res.end(response.first_name + " " + response.last_name + " your score is 90 fro get request");
// })

app.post('/process_post', urlencodedParser, function(req, res) {
    // Prepare output in JSON format
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response);
    //res.end(JSON.stringify(response));
    res.end(response.first_name + " " + response.last_name + " your score is 90 from post request");
})


// app.post('/file_upload', function(req, res) {
//     console.log(req.files.file.name);
//     console.log(req.files.file.path);
//     console.log(req.files.file.type);
//     var file = __dirname + "/" + req.files.file.name;

//     fs.readFile(req.files.file.path, function(err, data) {
//         fs.writeFile(file, data, function(err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 response = {
//                     message: 'File uploaded successfully',
//                     filename: req.files.file.name
//                 };
//             }

//             console.log(response);
//             res.end(JSON.stringify(response));
//         });
//     });
// })

// This responds a POST request for the homepage
app.post('/', function(req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function(req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function(req, res) {
    console.log("Got a GET request for /list_user");
    res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
})

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})