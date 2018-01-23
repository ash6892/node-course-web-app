var express  = require('express');
var hbs = require('hbs');
var fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log +'\n', (err) => {
        if(err){
            console.log("Error writing logs");
        }
    });
    next();
});

// app.use((req, res, next) => {
//     fs.appendFile('server.log', `${new Date().toString()} Under Maintenance` +'\n', (err) => {
//         if(err){
//             console.log("Error writing logs");
//         }
//     });
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        pageBody: 'This is Home Page body'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About',
        pageBody: 'This is about page body'
    });
});

app.listen(3000,() => {
    console.log("Server started at port 3000");
    console.log("Access application at http://localhost:3000");
});