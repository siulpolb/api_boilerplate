var Joi = require('joi');
var resources = require('./resources');

module.exports = {

	mongoId : 
	{
		params : 
		{
			id : Joi.string().regex(/^[0-9a-fA-F]{24}$/,'ID').required()
		}
	}

};