var express = require('express');
var router = express.Router();
var crypto = require('crypto');


//var session = require('express-session');
//var cookieParser = require('cookie-parser');

//router.use(cookieParser('MAGICString'));
//router.use(session({
  //secret: 'keyboard cat',
  //resave: false,
  //saveUninitialized: true,
  //cookie: { secure: true }
//}));



function hashPW(pwd){
	return crypto.createHash('sha256').update(pwd).
	digest('base64').toString();
}

router.get('/restricted', function(req, res){

  if (req.session.user) {
    res.send('<h2>'+ req.session.success + '</h2>' +
             '<p>You have entered the restricted section<p><br>' +
             ' <a href="/logout">logout</a>');
  } else {
       console.log("Session: "+req.session);
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
});
router.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect('/login');
  });
});
router.get('/login', function(req, res){
console.log(req.cookies);
console.log(req.session);
  console.log("Session user : "+ req.session.user);
  var response = '<form method="POST">' +
    'Username: <input type="text" name="username"><br>' +
    'Password: <input type="password" name="password"><br>' +
    '<input type="submit" value="Submit"></form>';
  if(req.session.user){
    res.redirect('/restricted');
  }else if(req.session.error){
    response +='<h2>' + req.session.error + '<h2>';

  }
     //res.type('html');
  res.send(response);
});
router.post('/login', function(req, res){
  //user should be a lookup of req.body.username in database
  //var user = {name:req.body.username, password:hashPW("myPass")};
var user = {name:req.body.username, password:hashPW('pass')};

  if (user.password === hashPW(req.body.password.toString())) {
    
    req.session.regenerate(function(){
      req.session.user = user;
      req.session.success = 'Authenticated as ' + user.name;

           console.log("Nom de user: "+user.name);
           console.log("Password: "+user.password);
           console.log("Session regenerate: Session user name: " + req.session.user.name);
              res.redirect('/restricted');
    });


  } else {
    req.session.regenerate(function(){
      req.session.error = 'Authentication failed.';
     // res.redirect('/restricted');
    });
    console.log('user non valide: ');
           console.log('Nom de user: '+ user.name);
    
    res.redirect('/login');
  }
});


module.exports = router