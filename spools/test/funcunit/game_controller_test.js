/*global module: true, ok: true, equals: true, S: true, test: true */
module("game", {
	setup: function () {
		// open the page
		S.open("//spools/spools.html");

		//make sure there's at least one game on the page before running a test
		S('.game').exists();
	},
	//a helper function that creates a game
	create: function () {
		S("[name=name]").type("Ice");
		S("[name=description]").type("Cold Water");
		S("[type=submit]").click();
		S('.game:nth-child(2)').exists();
	}
});

test("games present", function () {
	ok(S('.game').size() >= 1, "There is at least one game");
});

test("create games", function () {

	this.create();

	S(function () {
		ok(S('.game:nth-child(2) td:first').text().match(/Ice/), "Typed Ice");
	});
});

test("edit games", function () {

	this.create();

	S('.game:nth-child(2) a.edit').click();
	S(".game input[name=name]").type(" Water");
	S(".game input[name=description]").type("\b\b\b\b\bTap Water");
	S(".update").click();
	S('.game:nth-child(2) .edit').exists(function () {

		ok(S('.game:nth-child(2) td:first').text().match(/Ice Water/), "Typed Ice Water");

		ok(S('.game:nth-child(2) td:nth-child(2)').text().match(/Cold Tap Water/), "Typed Cold Tap Water");
	});
});

test("destroy", function () {

	this.create();

	S(".game:nth-child(2) .destroy").click();

	//makes the next confirmation return true
	S.confirm(true);

	S('.game:nth-child(2)').missing(function () {
		ok("destroyed");
	});

});