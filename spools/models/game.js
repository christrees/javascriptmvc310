/**
 * @tag models, home
 * Wraps backend game services.  Enables 
 * [Spools.Models.Game.static.findAll retrieving],
 * [Spools.Models.Game.static.update updating],
 * [Spools.Models.Game.static.destroy destroying], and
 * [Spools.Models.Game.static.create creating] games.
 */
$.Model.extend('Spools.Models.Game',
/* @Static */
{
	/**
 	 * Retrieves games data from your backend services.
 	 * @param {Object} params params that might refine your results.
 	 * @param {Function} success a callback function that returns wrapped game objects.
 	 * @param {Function} error a callback function for an error in the ajax request.
 	 */
	findAll: function( params, success, error ){
		$.ajax({
		//	url: '/game',
			url: 'spoolspps/game.php',
		//	url: 'http://javascriptmvc310.xplanb.net/spools/spoolspps/game.php',
			type: 'get',
			dataType: 'json',
			data: params,
			success: this.callback(['wrapMany',success]),
			error: error,
			fixture: "//spools/fixtures/games.json.get" //calculates the fixture path from the url and type.
		});
	},
	/**
	 * Updates a game's data.
	 * @param {String} id A unique id representing your game.
	 * @param {Object} attrs Data to update your game with.
	 * @param {Function} success a callback function that indicates a successful update.
 	 * @param {Function} error a callback that should be called with an object of errors.
     */
	update: function( id, attrs, success, error ){
		$.ajax({
//			url: '/games/'+id,
//			type: 'put',
			url: 'spoolspps/games.php',
//			url: 'http://javascriptmvc310.xplanb.net/spools/spoolspps/games.php',
			type: 'post',
			dataType: 'json',
			data: attrs,
			success: success,
			error: error,
			fixture: "-restUpdate" //uses $.fixture.restUpdate for response.
		});
	},
	/**
 	 * Destroys a game's data.
 	 * @param {String} id A unique id representing your game.
	 * @param {Function} success a callback function that indicates a successful destroy.
 	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	destroy: function( id, success, error ){
		$.ajax({
			url: '/games/'+id,
			type: 'delete',
			dataType: 'json',
			success: success,
			error: error,
			fixture: "-restDestroy" // uses $.fixture.restDestroy for response.
		});
	},
	/**
	 * Creates a game.
	 * @param {Object} attrs A game's attributes.
	 * @param {Function} success a callback function that indicates a successful create.  The data that comes back must have an ID property.
	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	create: function( attrs, success, error ){
		$.ajax({
	//		url: '/games',
			url: 'spoolspps/games.php',
	//		url: 'http://javascriptmvc310.xplanb.net/spools/spoolspps/games.php',
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