[![Build Status](https://travis-ci.org/afpa-stbrieuc/timeshare-mean1.svg?branch=master)](https://travis-ci.org/afpa-stbrieuc/timeshare-mean1)

##About

TimeShare App is web app made in NodeJs/MongoDB/AngularJs, it allows user to offer or to ask for a service and get paid with time (minutes). ( I offer a service then I win 1hours, so I can ask for service and I pay with the 1 hours I won ( sorry for my english ^^)).

This project is developped with ExpressJs (Server Side) and AngularJs + Bootstrap (Client Side)

Modules used to develop the API :
 - ExpressJs
 - Mongoose as ODM ( MongoDB access)
 - Multer ( Upload )
 - NodeMailer ( Send mails)
 - PassportJs for authentification ( login, register, profile, password reset ...) - local strategy
 
Modules used for Client side : 
 - AngularJs 1.4.8
 - jQuery
 - Bootstrap (CSS & JS)
 - Angular Animate
 - Angular Router
 - Angular material
 - Angular Date picker

##Demo

http://timeshareapp.eu-1.evennode.com/   

Enjoy :)

##install
 - go to project dir
 
- `npm install app/api/ --prefix app/api/` ( load node app dependencies in app/api )
- `bower install` ( load all web libs required by the client in app/public )
- `npm install --dev` ( will load all dependencies required by grunt )

##run
`grunt serve`

##build
`grunt`
