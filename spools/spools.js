steal.plugins(	
	'jquery/controller',			// a widget factory
	'jquery/controller/subscribe',          // subscribe to OpenAjax.hub
	'jquery/view/ejs',			// client side templates
	'jquery/controller/view',		// lookup views with the controller's name
	'jquery/model',				// Ajax wrappers
//	'jquery/dom/fixture',			// simulated Ajax requests
	'jquery/dom/form_params')		// form data helper
	.css('spools')                          // loads styles
	.resources()				// 3rd party script's (like jQueryUI), in resources folder
	.models('game')			// loads files in models folder
	.controllers('game')			// loads files in controllers folder
	.views()				// adds views to be added to build
        .models('token')
        .controllers('token')
        .then(function($){
        // create a new Tabs class
            $.Controller("Tabs",{
              // initialize widget
              init : function(el){
                // activate the first tab
                $(el).children("li:first").addClass('active')
                // hide the other tabs
                var tab = this.tab;
                this.element.children("li:gt(0)").each(function(){
                  tab($(this)).hide()
                })
              },
              // helper function finds the tab for a given li
              tab : function(li){
                return $(li.find("a").attr("href"))
              },
              // hides old active tab, shows new one
              "li click" : function(el, ev){
                ev.preventDefault();
                this.tab(this.find('.active').removeClass('active')).hide()
                this.tab(el.addClass('active')).show();
              }
            })
        });