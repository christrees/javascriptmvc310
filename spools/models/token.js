/**
 * @tag models, home
 * Wraps backend token services.  Enables 
 * [Spools.Models.Token.static.findAll retrieving],
 * [Spools.Models.Token.static.update updating],
 * [Spools.Models.Token.static.destroy destroying], and
 * [Spools.Models.Token.static.create creating] tokens.
 */
$.Model.extend('Spools.Models.Token',
/* @Static */
{
	/**
 	 * Retrieves tokens data from your backend services.
 	 * @param {Object} params params that might refine your results.
 	 * @param {Function} success a callback function that returns wrapped token objects.
 	 * @param {Function} error a callback function for an error in the ajax request.
 	 */
	findAll: function( params, success, error ){
		$.ajax({
			url: '/token',
			type: 'get',
			dataType: 'json',
			data: params,
			success: this.callback(['wrapMany',success]),
			error: error,
			fixture: "//spools/fixtures/tokens.json.get" //calculates the fixture path from the url and type.
		});
	},
	/**
	 * Updates a token's data.
	 * @param {String} id A unique id representing your token.
	 * @param {Object} attrs Data to update your token with.
	 * @param {Function} success a callback function that indicates a successful update.
 	 * @param {Function} error a callback that should be called with an object of errors.
     */
	update: function( id, attrs, success, error ){
		$.ajax({
			url: '/tokens/'+id,
			type: 'put',
			dataType: 'json',
			data: attrs,
			success: success,
			error: error,
			fixture: "-restUpdate" //uses $.fixture.restUpdate for response.
		});
	},
	/**
 	 * Destroys a token's data.
 	 * @param {String} id A unique id representing your token.
	 * @param {Function} success a callback function that indicates a successful destroy.
 	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	destroy: function( id, success, error ){
		$.ajax({
			url: '/tokens/'+id,
			type: 'delete',
			dataType: 'json',
			success: success,
			error: error,
			fixture: "-restDestroy" // uses $.fixture.restDestroy for response.
		});
	},
	/**
	 * Creates a token.
	 * @param {Object} attrs A token's attributes.
	 * @param {Function} success a callback function that indicates a successful create.  The data that comes back must have an ID property.
	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	create: function( attrs, success, error ){
		$.ajax({
			url: '/tokens',
			type: 'post',
			dataType: 'json',
			success: success,
			error: error,
			data: attrs,
			fixture: "-restCreate" //uses $.fixture.restCreate for response.
		});
	}
},
/* @Prototype */
{});