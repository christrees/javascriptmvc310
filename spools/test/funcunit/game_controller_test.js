/*global module: true, ok: true, equals: true, S: true, test: true */
module("game", {
setup: function () {
    //--Clear the data so we start from scratch.
    S.open("//spools/spoolspps/nukecookieandsession.php");
    S("[type=submit]").click();
    // open the page
    S.open("//spools/spools.html");
    stop();
    //--Default first index should be 0 and increment from there
    S('.spools_models_game_0 .view').exists(function () {
        ok(S('.spools_models_game_0 td.idGameBrd').text().match(/0/), "Default idGameBrd 0");
        ok(S('.spools_models_game_0 td.TypeSport').text().match(/Baseball/), "Default TypeSport Baseball");
        ok(S('.spools_models_game_0 td.TeamNameA').text().match(/Home Team/), "Default Home Team");
        ok(S('.spools_models_game_0 td.TeamNameB').text().match(/Away Team/), "Default Away Team");
        ok(S('.spools_models_game_0 td.TeamAScore').text().match(/0/), "Default Home Score 0");
        ok(S('.spools_models_game_0 td.TeamBScore').text().match(/0/), "Default Away Score 0");
        ok(S('.spools_models_game_0 td.message').text().match(/New Game/), "Default Message");
        ok(S('.spools_models_game_0 td.GameState').text().match(/JoinGame/), "Default GameState GameJoin");
    });
},
//a helper function that creates a game
create22: function () {
    S("[name=idGameBrd]").type("22");
    S("[name=TeamNameA]").type("TestTeamA");
    S("[name=TeamNameB]").type("TestTeamB");
    S("[type=submit]").click();
    S('.game:nth-child(2)').exists();
},
checkgame: function() {
    alert('hello chris');
}
});
//-TEST1
test("GAMES: Default", function () {
    ok(S('.game').size() >= 1, "There is at least one game");
});
//-TEST2
test("GAMES: Create", function () {
    this.create22();
    //--Check what create22 should have done
    S('.spools_models_game_1 .view').exists(function () {
        ok(S('.spools_models_game_1 td.idGameBrd').text().match(/22/), "<<BEGIN>>: create22 gameboard is 22");
        ok(S('.spools_models_game_1 td.TypeSport').text().match(/Football/), "TypeSport Football");
        ok(S('.spools_models_game_1 td.TeamNameA').text().match(/TestTeamA/), "TestTeamA");
        ok(S('.spools_models_game_1 td.TeamNameB').text().match(/TestTeamB/), "TestTeamB");
        ok(S('.spools_models_game_1 td.TeamAScore').text().match(/0/), "Default Home Score 0");
        ok(S('.spools_models_game_1 td.TeamBScore').text().match(/0/), "Default Away Score 0");
        ok(S('.spools_models_game_1 td.message').text().match(/New Game/), "Message");
        ok(S('.spools_models_game_1 td.GameState').text().match(/JoinGame/), "Default GameState GameJoin");
    });
});
//-TEST3
test("GAMES: Mod a Game", function () {
    this.create22();
    S('.spools_models_game_1 a.edit').click();
    S(".spools_models_game_1 input[name=TeamNameA]").type("CHANGED");
    S(".spools_models_game_1 input[name=TeamNameB]").type("CHANGED");
    S(".spools_models_game_1 input[value=Update]").click();
    S('.spools_models_game_1 .edit').exists(function () {
            ok(S('.spools_models_game_1 td.TeamNameA').text().match(/TestTeamACHANGED/), "Typed TestTeamACHANGED");
            ok(S('.spools_models_game_1 td.TeamNameB').text().match(/TestTeamBCHANGED/), "Typed TestTeamBCHANGED");
    });
});
//-TEST4
test("GAMES: Make multiple games", function () {
    this.create22();
    //--Now Mod the created board
    S('.spools_models_game_1 a.edit').click();
    S(".spools_models_game_1 option[value=Football]").click();
    S(".spools_models_game_1 input[name=TeamNameA]").type("CHANGED");
    S(".spools_models_game_1 input[name=TeamNameB]").type("CHANGED");
    S(".spools_models_game_1 input[value=Update]").click();
    S('.spools_models_game_1 .edit').exists(function () {
        ok(S('.spools_models_game_1 td.TeamNameA').text().match(/TestTeamACHANGED/), "Typed TestTeamACHANGED");
        ok(S('.spools_models_game_1 td.TeamNameB').text().match(/TestTeamBCHANGED/), "Typed TestTeamBCHANGED");
    });
    //--Check what Mod should have done
    S('.spools_models_game_1 td.TeamNameA').exists(function () {
            ok(S('.spools_models_game_1 td.idGameBrd').text().match(/22/), "<<BEGIN>>: MOD board22 gameboard");
            ok(S('.spools_models_game_1 td.TypeSport').text().match(/Football/), "Football");
            ok(S('.spools_models_game_1 td.TeamNameA').text().match(/TestTeamACHANGED/), "TestTeamACHANGED");
            ok(S('.spools_models_game_1 td.TeamNameB').text().match(/TestTeamBCHANGED/), "TestTeamBCHANGED");
            ok(S('.spools_models_game_1 td.TeamAScore').text().match(/0/), "Home Score 0");
            ok(S('.spools_models_game_1 td.TeamBScore').text().match(/0/), "Away Score 0");
            ok(S('.spools_models_game_1 td.message').text().match(/New Game/), "Message");
            ok(S('.spools_models_game_1 td.GameState').text().match(/JoinGame/), "Default GameState GameJoin");
            stop();
    });
    S.open("//spools/spools.html");
    //--Create the second new board
    S('input[value=Create]').exists(function () {
        S("input[name=idGameBrd]").type("33");
        //S("option[value=Football]").click();
        S("input[name=TeamNameA]").type("33TeamA");
        S("input[name=TeamNameB]").type("33TeamB");
        S("input[value=Create]").click();
        S('.spools_models_game_2 .edit').exists(function () {
            ok(S('.spools_models_game_2 td.TeamNameA').text().match(/33TeamA/), "Typed 33TeamA");
            ok(S('.spools_models_game_2 td.TeamNameB').text().match(/33TeamB/), "Typed 33TeamB");
        });
     });
    //--Check what create should have done
    S('.spools_models_game_2 .view').exists(function () {
            ok(S('.spools_models_game_2 td.idGameBrd').text().match(/33/), "<BEGIN>>: create 33 gameboard");
            ok(S('.spools_models_game_2 td.TypeSport').text().match(/Football/), "create TypeSport Football");
            ok(S('.spools_models_game_2 td.TeamNameA').text().match(/33TeamA/), "Typed 33TeamA");
            ok(S('.spools_models_game_2 td.TeamNameB').text().match(/33TeamB/), "Typed 33TeamB");
            ok(S('.spools_models_game_2 td.TeamAScore').text().match(/0/), "Default Home Score 0");
            ok(S('.spools_models_game_2 td.TeamBScore').text().match(/0/), "Default Away Score 0");
            ok(S('.spools_models_game_2 td.message').text().match(/New Game/), "create Message");
            ok(S('.spools_models_game_2 td.GameState').text().match(/JoinGame/), "Default GameState GameJoin");
    });
});
test("GAMES: Test Token picks", function () {
    this.create22();
    //--Now Mod the created board
    S('.spools_models_game_1 a.edit').click();
    S(".spools_models_game_1 option[value=Football]").click();
    S(".spools_models_game_1 input[name=TeamNameA]").type("CHANGED");
    S(".spools_models_game_1 input[name=TeamNameB]").type("CHANGED");
    S(".spools_models_game_1 input[value=Update]").click();
    S('.spools_models_game_1 .edit').exists(function () {
        ok(S('.spools_models_game_1 td.TeamNameA').text().match(/TestTeamACHANGED/), "Typed TestTeamACHANGED");
        ok(S('.spools_models_game_1 td.TeamNameB').text().match(/TestTeamBCHANGED/), "Typed TestTeamBCHANGED");
    });
    //--Check what Mod should have done
    S('.spools_models_game_1 td.TeamNameA').exists(function () {
            ok(S('.spools_models_game_1 td.idGameBrd').text().match(/22/), "<<BEGIN>>: MOD board22 gameboard");
            ok(S('.spools_models_game_1 td.TypeSport').text().match(/Football/), "Football");
            ok(S('.spools_models_game_1 td.TeamNameA').text().match(/TestTeamACHANGED/), "TestTeamACHANGED");
            ok(S('.spools_models_game_1 td.TeamNameB').text().match(/TestTeamBCHANGED/), "TestTeamBCHANGED");
            ok(S('.spools_models_game_1 td.TeamAScore').text().match(/0/), "Home Score 0");
            ok(S('.spools_models_game_1 td.TeamBScore').text().match(/0/), "Away Score 0");
            ok(S('.spools_models_game_1 td.message').text().match(/New Game/), "Message");
            ok(S('.spools_models_game_1 td.GameState').text().match(/JoinGame/), "Default GameState GameJoin");
            stop();
    });
    S.open("//spools/spools.html");
    //--Create the second new board
    S('input[value=Create]').exists(function () {
        S("input[name=idGameBrd]").type("33");
        //S("option[value=Football]").click();
        S("input[name=TeamNameA]").type("33TeamA");
        S("input[name=TeamNameB]").type("33TeamB");
        S("input[value=Create]").click();
        S('.spools_models_game_2 .edit').exists(function () {
            ok(S('.spools_models_game_2 td.TeamNameA').text().match(/33TeamA/), "Typed 33TeamA");
            ok(S('.spools_models_game_2 td.TeamNameB').text().match(/33TeamB/), "Typed 33TeamB");
        });
     });
    //--Check what create should have done
    S('.spools_models_game_2 .view').exists(function () {
            ok(S('.spools_models_game_2 td.idGameBrd').text().match(/33/), "<BEGIN>>: create 33 gameboard");
            ok(S('.spools_models_game_2 td.TypeSport').text().match(/Football/), "create TypeSport Football");
            ok(S('.spools_models_game_2 td.TeamNameA').text().match(/33TeamA/), "Typed 33TeamA");
            ok(S('.spools_models_game_2 td.TeamNameB').text().match(/33TeamB/), "Typed 33TeamB");
            ok(S('.spools_models_game_2 td.TeamAScore').text().match(/0/), "Default Home Score 0");
            ok(S('.spools_models_game_2 td.TeamBScore').text().match(/0/), "Default Away Score 0");
            ok(S('.spools_models_game_2 td.message').text().match(/New Game/), "create Message");
            ok(S('.spools_models_game_2 td.GameState').text().match(/JoinGame/), "Default GameState GameJoin");
    });
    S.open("//spools/spools.html");
    //--Look at the token board verify Board 0 the default
    
    S('div#token').exists(function (){
        ok( 1, "<<BEGIN>>: Verify board 0 default");
        ok( S('.idGameBrd').text().match(/0/), "Verify board 0 default");
        S(".spools_models_game_0 a.view").click();
         S("tr.spools_models_token_1 td.idGameBrd").exists( function () {
            ok( S(".spools_models_token_1 .idGameBrd").text().match(/0/), "Verify board 0 default");
        });
        //var myidPlayer = S('tr.spools_models_token_1 td.idPlayer').text();
       // ok( /myidPlayer/.test( S('tr.spools_models_token_2 td.idPlayer').text() ), "Verify idPlayer on tokens");
    });

});

/*
test("destroy", function () {
	this.create();
	S(".game:nth-child(2) .destroy").click();
	//makes the next confirmation return true
	S.confirm(true);
	S('.game:nth-child(2)').missing(function () {
		ok("destroyed");
	});
});
*/