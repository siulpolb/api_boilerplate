var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-express');

mongoose.connect('mongodb://localhost/api',{useMongoClient: true});
mongoose.Promise = require('bluebird');

var index = require('./routes/index');

var allowCrossDomain = function(req, res, next)
{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
	next();
}

var app = express();


app.use(jwt.init('secret',{cookies:false, refresh:false}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(__dirname + '/public/docs'));
app.use(allowCrossDomain);

app.use('/', index);

app.use(function(err, req, res, next)
{
	if (err.name == 'JWTExpressError')
	{
		res.status(401);
		res.json({message:err.message, errors: [{message: err.message, path:"Authorization Header"}]});
	}
	else 
	{
		next(err);
	}
});

app.use(function(err,req,res,next)
{
	if(err.isJoi)
	{
		console.log(req.body);
		var errors = [];
		for(var detail in err.details)
		{
			var e = {
				path : err.details[detail].path,
				message : err.details[detail].message
			};
			errors.push(e);
		}
		res.status(400)
		res.send({message: "Received Data Error", errors: errors});
	}
	else
	{
		next(err);
	}
});

// catch 404 and forward to error handler
app.use(function(req, res, next)
{
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next)
{
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.json({message:err.message, errors: [{message: err.message, path:""}]});
});

module.exports = app;
