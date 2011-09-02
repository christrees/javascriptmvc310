/**
 * @tag controllers, home
 * Displays a table of tokens.	 Lets the user 
 * ["Spools.Controllers.Token.prototype.form submit" create], 
 * ["Spools.Controllers.Token.prototype.&#46;edit click" edit],
 * or ["Spools.Controllers.Token.prototype.&#46;destroy click" destroy] tokens.
 */
$.Controller.extend('Spools.Controllers.Token',
/* @Static */
{
	onDocument: true
},
/* @Prototype */
{
 /**
 * When the page loads, gets all tokens to be displayed.
 */
 "{window} load": function(){
	if(!$("#token").length){
	 $('#tab3').append($('<div/>').attr('id','token'));
                //-- let the game_controller trigger the fetch
        // Spools.Models.Token.findAll({}, this.callback('grid'));
 	}
 },
 /**
 * Displays a list of tokens and the submit form.
 * @param {Array} tokens An array of Spools.Models.Token objects.
 */
 grid: function( tokens ){ /**/
           $('#token').html(this.view('grid', {tokens:tokens, game:game} ));
 },
 /**
 * Displays a list of tokens and the submit form.
 * @param {Array} tokens An array of Spools.Models.Token objects.
 */
 list: function( tokens ){
	$('#token').html(this.view('list', {tokens:tokens} ));
 },
 /**
 * Responds to the create form being submitted by creating a new Spools.Models.Token.
 * @param {jQuery} el A jQuery wrapped element.
 * @param {Event} ev A jQuery event whose default action is prevented.
 */
'form submit': function( el, ev ){
	ev.preventDefault();
	new Spools.Models.Token(el.formParams()).save();
},
/**
 * Listens for tokens being created.	 When a token is created, displays the new token.
 * @param {String} called The open ajax event that was called.
 * @param {Event} token The new token.
 */
'token.created subscribe': function( called, token ){
	$("#token tbody").append( this.view("list", {tokens:[token]}) );
	$("#token form input[type!=submit]").val(""); //clear old vals
},
 /**
 * Creates and places the edit interface.
 * @param {jQuery} el The token's edit link element.
 */
'.edit click': function( el ){
	var token = el.closest('.token').model();
	token.elements().html(this.view('edit', token));
},
 /**
 * Removes the edit interface.
 * @param {jQuery} el The token's cancel link element.
 */
'.cancel click': function( el ){
	this.show(el.closest('.token').model());
},
 /**
 * Updates the token from the edit values.
 */
'.update click': function( el ){
	var $token = el.closest('.token'); 
	$token.model().update($token.formParams());
},
 /**
 * Updates the token from a buy request values.
 */
'.pick click': function( el ){
	var $token = el.closest('.token');
	$token.model().update($token.formParams());
        var curgame = $('.spools_model_game_0').model();
        var alltokens;
        Spools.Models.Token.findAll({}, alltokens);
        //alert("Token_curgame: "+curgame['idGameBrd']);
        //alert("Token_tokens: "+alltokens['idGameBrd']);
        $('#token').html(this.view('grid', {tokens:alltokens, game:curgame} ));
},
 /**
 * Listens for updated tokens.	 When a token is updated, 
 * update's its display.
 */
'token.updated subscribe': function( called, token ){
	// this.show(token);
        // this.grid(token);
        /*
        Spools.Models.Token.findAll({}, function(data){
          $('#token').html(Spools.Controllers.Token.prototype.view('grid', {tokens:data, game:curgame} ));
        });
        */
       //alert('token-update subscribe');
        
},
/**
 * Shows a token's information.
 */
show: function( token ){
	token.elements().html(this.view('show',token));
},
 /**
 *	 Handle's clicking on a token's destroy link.
 */
'.destroy click': function( el ){
	if(confirm("Are you sure you want to destroy?")){
		el.closest('.token').model().destroy();
	}
 },
 /**
 *	 Listens for tokens being destroyed and removes them from being displayed.
 */
"token.destroyed subscribe": function(called, token){
	token.elements().remove();	 //removes ALL elements
 }
});