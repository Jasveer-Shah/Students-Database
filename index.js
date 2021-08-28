require('./models/db')

const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
// express phbs
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');
const studentController = require('./controllers/StudentController')

var app = express();
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());

app.get('/', (req, res)=>{
    res.send(
        `<h2>Welcome to student database!!</h2>
        <h3>Click here to get access to the
        <a href="/student/list">
        Database</a>
        </h3>`
    )
})

app.set('views', path.join(__dirname, '/views/'))

app.engine(
    "hbs",
    exphbs({
        handlebars: allowInsecurePrototypeAccess(handlebars),
        exrname:"hbs",
        defaultLayout: "MainLayout",
        layoutDir: __dirname + '/views/layouts/',
    })
)

app.set("view engine", "hbs");

app.listen(3003, ()=>{
    console.log('server started at port 3003')
})

app.use('/student', studentController);