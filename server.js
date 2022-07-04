var express = require('express');
var app = express();
//for parsing the body in post request
var bodyParser = require('body-parser');

var users = [{
    id: 1,
    name: 'Amir Sidik',
    age: 23,
    email: 'mkamirsidik@gmail.com'
}]

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/users', function(req, res) {
    return res.json(users);
})

app.get('/', function(req, res) {
    return res.json(users);
})

app.post('/api/users', function(req, res) {
    var user = req.body.user;
    users.push(user);

    return res.json(users);
})

app.listen('3000', () => {
    console.log('Server listening on port 3000');
});