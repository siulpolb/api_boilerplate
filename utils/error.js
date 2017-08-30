module.exports = {

	NO_ERROR : 200,
	ERROR_CLIENT : 400,
	ERROR_UNAUTH : 401,
	ERROR_SERVER : 500,

	mongoose(err)
	{
		console.log(err);
		var errors = [];
		var finalMessage = "Something Fail";
		if(err.code == 11000)
		{
			var e = {
				path : "unique value",
				message : "Duplicated Value"
			};
			errors.push(e);
		}
		if(err.name === 'CastError')
		{
			finalMessage = "Invalid Value";
			var e = {
				path : err.path,
				message : "Invalid Value"
			};
			errors.push(e);	
		}
		if(err.name === 'ValidationError')
		{
			finalMessage = "Validation Error";
			for(path in err.errors)
			{
				var message = err.errors[path].message;
				if(err.errors[path].name === 'CastError')
				{
					message = "Invalid Value";
				}
				var e = {
					path : err.errors[path].path,
					message : message
				};
				errors.push(e);
			}
		}
		return {message: finalMessage, errors: errors};
	},

	validation(err)
	{
		var errors = [];
		for(var detail in err.details)
		{
			var e = {
				path : err.details[detail].path,
				message : err.details[detail].message
			};
			errors.push(e);
		}
		return {message: "Validation Error", errors: errors};
	},

	server()
	{
		var err = {
			message : "Server Error",
			errors : []
		};
		return err;
	},

	invalidId()
	{
		var err = {
			message : "Invalid ID",
			errors : []
		};
		return err;
	},

	notExists()
	{
		var err = {
			message : "ID doesn't exists",
			errors : []
		};
		return err;
	},

};