/*global module: true, ok: true, equals: true, S: true, test: true */
module("token", {
	setup: function () {
		// open the page
		S.open("//spools/spools.html");

		//make sure there's at least one token on the page before running a test
		S('.token').exists();
	},
	//a helper function that creates a token
	create: function () {
		S("[name=name]").type("Ice");
		S("[name=description]").type("Cold Water");
		S("[type=submit]").click();
		S('.token:nth-child(2)').exists();
	}
});

test("tokens present", function () {
	ok(S('.token').size() >= 1, "There is at least one token");
});

test("create tokens", function () {

	this.create();

	S(function () {
		ok(S('.token:nth-child(2) td:first').text().match(/Ice/), "Typed Ice");
	});
});

test("edit tokens", function () {

	this.create();

	S('.token:nth-child(2) a.edit').click();
	S(".token input[name=name]").type(" Water");
	S(".token input[name=description]").type("\b\b\b\b\bTap Water");
	S(".update").click();
	S('.token:nth-child(2) .edit').exists(function () {

		ok(S('.token:nth-child(2) td:first').text().match(/Ice Water/), "Typed Ice Water");

		ok(S('.token:nth-child(2) td:nth-child(2)').text().match(/Cold Tap Water/), "Typed Cold Tap Water");
	});
});

test("destroy", function () {

	this.create();

	S(".token:nth-child(2) .destroy").click();

	//makes the next confirmation return true
	S.confirm(true);

	S('.token:nth-child(2)').missing(function () {
		ok("destroyed");
	});

});