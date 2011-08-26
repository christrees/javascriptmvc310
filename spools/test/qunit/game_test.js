module("Model: Spools.Models.Game")

asyncTest("findAll", function(){
	stop(2000);
	Spools.Models.Game.findAll({}, function(games){
		ok(games)
        ok(games.length)
        ok(games[0].name)
        ok(games[0].description)
		start()
	});
	
})

asyncTest("create", function(){
	stop(2000);
	new Spools.Models.Game({name: "dry cleaning", description: "take to street corner"}).save(function(game){
		ok(game);
        ok(game.id);
        equals(game.name,"dry cleaning")
        game.destroy()
		start();
	})
})
asyncTest("update" , function(){
	stop();
	new Spools.Models.Game({name: "cook dinner", description: "chicken"}).
            save(function(game){
            	equals(game.description,"chicken");
        		game.update({description: "steak"},function(game){
        			equals(game.description,"steak");
        			game.destroy();
        			start()
        		})
            })

});
asyncTest("destroy", function(){
	stop(2000);
	new Spools.Models.Game({name: "mow grass", description: "use riding mower"}).
            destroy(function(game){
            	ok( true ,"Destroy called" )
            	start();
            })
})