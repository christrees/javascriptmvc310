// create a new Tabs class
$.Controller('Spools.Controllers.Tabs',
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
	if(!$("#tabs").length){
	 $(document.body).append($('<div/>').attr('id','tabs'));
		// Spools.Models.Game.findAll({}, this.callback('list'));
 	}
 },
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
});



