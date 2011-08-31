/**
 * @tag controllers, home
 * Displays a table of games.	 Lets the user 
 * ["Spools.Controllers.Game.prototype.form submit" create], 
 * ["Spools.Controllers.Game.prototype.&#46;edit click" edit],
 * or ["Spools.Controllers.Game.prototype.&#46;destroy click" destroy] games.
 */
$.Controller.extend('Spools.Controllers.Game',
/* @Static */
{
	onDocument: true
},
/* @Prototype */
{
 /**
 * When the page loads, gets all games to be displayed.
 */
 "{window} load": function(){
	if(!$("#game").length){
	 $(document.body).append($('<div/>').attr('id','game'));
		 Spools.Models.Game.findAll({}, this.callback('list'));
 	}
 },
 /**
 * Displays a list of games and the submit form.
 * @param {Array} games An array of Spools.Models.Game objects.
 */
 list: function( games ){
	$('#game').html(this.view('init', {games:games} ));
 },
 /**
 * Responds to the create form being submitted by creating a new Spools.Models.Game.
 * @param {jQuery} el A jQuery wrapped element.
 * @param {Event} ev A jQuery event whose default action is prevented.
 */
'form submit': function( el, ev ){
	ev.preventDefault();
	new Spools.Models.Game(el.formParams()).save();
},
/**
 * Listens for games being created.	 When a game is created, displays the new game.
 * @param {String} called The open ajax event that was called.
 * @param {Event} game The new game.
 */
'game.created subscribe': function( called, game ){
	$("#game tbody").append( this.view("list", {games:[game]}) );
	$("#game form input[type!=submit]").val(""); //clear old vals
},
 /**
 * Creates and places the edit interface.
 * @param {jQuery} el The game's edit link element.
 */
'.edit click': function( el ){
	var game = el.closest('.game').model();
	game.elements().html(this.view('edit', game));
},
 /**
 * Removes the edit interface.
 * @param {jQuery} el The game's cancel link element.
 */
'.cancel click': function( el ){
	this.show(el.closest('.game').model());
},
 /**
 * Updates the game from the edit values.
 */
'.update click': function( el ){
	var $game = el.closest('.game'); 
	$game.model().update($game.formParams());
},
 /**
 * Updates the game from the edit values.
 */
'.gamescoreminus click': function( el ){
    var stuff = parseInt(el.next('.gamescore').attr('value'));
    --stuff;
    el.next('.gamescore').attr('value', stuff);
    //alert(stuff);
    /*
	var $game = el.closest('.gamescore');
	$game.model().update($game.formParams());
    */
},
'.gamescoreplus click': function( el ){
    var stuff = parseInt(el.prev('.gamescore').attr('value'));
    ++stuff;
    el.prev('.gamescore').attr('value', stuff);
    //alert(stuff);
},
 /**
 * Listens for updated games.	 When a game is updated, 
 * update's its display.
 */
'game.updated subscribe': function( called, game ){
	this.show(game);
},
 /**
 *	 Handle's clicking on a game's view link.
 */
 '.view click': function( el ){
        $('.game').removeClass('gameselect');
        var curgame = el.closest('.game').model();
        function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		//date.setTime(date.getTime()+(sec*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
        }
        function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
        }
        function eraseCookie(name) {
	createCookie(name,"",-1);
        }
       // $.cookie('DoDo', 'Dah');
       // document.cookie = 'idGameBrd=' + curgame['idGameBrd'] + '; path=/';
       eraseCookie('idGameBrd');
       createCookie('idGameBrd',curgame['idGameBrd'],1);
       //alert("game_controller: "+curgame['idGameBrd']);
       //createCookie('catCrap',99,2);
        Spools.Models.Token.findAll({}, function(data){
          $('#token').html(Spools.Controllers.Token.prototype.view('grid', {tokens:data, game:curgame} ));
        });
 },
 /**
 * Shows a game's information.
 */
show: function( game ){
	game.elements().html(this.view('show',game));
},
 /**
 *	 Handle's clicking on a game's destroy link.
 */
'.destroy click': function( el ){
	if(confirm("Are you sure you want to destroy?")){
		el.closest('.game').model().destroy();
	}
 },
 /**
 *	 Listens for games being destroyed and removes them from being displayed.
 */
"game.destroyed subscribe": function(called, game){
	game.elements().remove();	 //removes ALL elements
 }
});