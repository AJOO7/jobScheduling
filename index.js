//begining 
const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded());
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

//adding routes
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.get('/', function (req, res) {

    return res.render('home');
});


// listening to the port
app.listen(port, function (err) {
    if (err) {
        console.log("ERROR while launching the page!!");
    }
    console.log("The server is up and running on port:: ", port);
})
