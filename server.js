var express = require('express');
var app = express();
var mongoose = require('mongoose');
//for parsing the body in post request
var bodyParser = require('body-parser');

const DB = 'mongodb+srv://amir272:makakamir@cluster0.h6b0krt.mongodb.net/?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>{
    console.log("Connected")
}).catch((err)=>{
    console.log("Error in connection");
});

var UserSchema = mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    email: String,
    address: String
});

var User = mongoose.model('User', UserSchema, 'userlist');

var users = [];

app.get('/api/users', function(req, res) {
    return res.json(users);
})

app.get('/', async function(req, res) {
    const filter = {};
    const all = await User.find(filter);
    return res.json(all);
})

//this will get the post data from user and will return a json data

app.post('/api/users', async function(req, res) {
    var user = req.body.user;
    users.push(user);
    var user1 = new User(user);
    //to insert one particular collection
    user1.save((err, user2)=> {
        if(err) return console.log(err);
        console.log(user2.name + " saved to mongodb");
    })
    //trying to find all the users in the schema
    const filter = {};
    const all = await User.find(filter);
    return res.json(all);

})

app.listen('3001', () => {
    console.log('Server listening on port 3001');
});