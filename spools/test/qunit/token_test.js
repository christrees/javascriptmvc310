module("Model: Spools.Models.Token")

asyncTest("findAll", function(){
	stop(2000);
	Spools.Models.Token.findAll({}, function(tokens){
		ok(tokens)
        ok(tokens.length)
        ok(tokens[0].name)
        ok(tokens[0].description)
		start()
	});
	
})

asyncTest("create", function(){
	stop(2000);
	new Spools.Models.Token({name: "dry cleaning", description: "take to street corner"}).save(function(token){
		ok(token);
        ok(token.id);
        equals(token.name,"dry cleaning")
        token.destroy()
		start();
	})
})
asyncTest("update" , function(){
	stop();
	new Spools.Models.Token({name: "cook dinner", description: "chicken"}).
            save(function(token){
            	equals(token.description,"chicken");
        		token.update({description: "steak"},function(token){
        			equals(token.description,"steak");
        			token.destroy();
        			start()
        		})
            })

});
asyncTest("destroy", function(){
	stop(2000);
	new Spools.Models.Token({name: "mow grass", description: "use riding mower"}).
            destroy(function(token){
            	ok( true ,"Destroy called" )
            	start();
            })
})