const express= require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express ();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((request,response,next)=>{
    var now = new Date().toString();
    var log = `${now}${request.method}${request.url}` ;
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to open');
        }
    });
    next();
});


hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.get('/',(request,response)=>{
   // response.send('<h1>Hello Express</h1>');
   response.render('home.hbs',{
        title : 'My First Page',
       message : 'Welcome User !', 
   })
});

app.get('/about',(request,response)=>{
    response.render('about.hbs',{
        title : 'My First Page',
    });
});

app.get('/bad',(request,response)=>{
    response.send({
        error : 'Error While Loading !!'
    })
});

app.listen(3000);