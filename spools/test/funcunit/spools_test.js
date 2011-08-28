module("spools test", { 
	setup: function(){
		S.open("//spools/spools.html");
	}
});

test("Copy Test", function(){
	equals(S("title").text(), "spools");
});