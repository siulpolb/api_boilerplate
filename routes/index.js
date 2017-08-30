var express = require('express');
var router = express.Router();

/**
 * @apiDefine ThreeErrors
 * @apiError (400,401,500 Error) {String} message Description of the Error
 * @apiError (400,401,500 Error) {Object[]} errors List of Errors
 * @apiError (400,401,500 Error) {String} errors.path Path of the error
 * @apiError (400,401,500 Error) {String} errors.message Information about the error
 */

router.get('/', function(req, res)
{
	res.status(200);
	res.send('Server Working...');
});

module.exports = router;