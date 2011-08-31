/*global module: true, ok: true, equals: true, S: true, test: true */
module("game", {
setup: function () {
    this.nukeuseranddata();
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
nukeuser: function () {
    S.open("//spools/spoolspps/nukecookieandsession.php");
    S("[type=submit]").exists();
    // open the page
    S.open("//spools/spools.html");
    S('.spools_models_game_0 .view').exists();
},
nukeuseranddata: function () {
    //--Clear the data so we start from scratch.
    S.open("//spools/spoolspps/nukecookieandsession.php");
    S("[type=submit]").exists().click();
    // open the page
    S.open("//spools/spools.html");
    S('.spools_models_game_0 .view').exists();
    S('div#game form input[value=Create]').exists();
},
defaultgameinput: function () {
  var defautinput = {
        expectedkey: 0,
        idGameBrd: '0',
        TypeSport: 'Football',
        TeamNameA: 'Home Team',
        TeamNameB: 'Away Team',
        TeamAScore: 0,
        TeamBScore: 0,
        message: 'New Game',
        GameState: 'JoinGame'
   };
   return defautinput;
},
creategame: function (gameinput) {
    var gamecreatedom = 'div#game form';
    S(gamecreatedom+' input[type=submit]').exists( function () {
        S(gamecreatedom+' div input[name=idGameBrd]').type(gameinput.idGameBrd);
        S(gamecreatedom+' div input[name=TeamNameA]').type(gameinput.TeamNameA);
        S(gamecreatedom+' div input[name=TeamNameB]').type(gameinput.TeamNameB);
        S(gamecreatedom+' input[type=submit]').click();
    });
    S('.game:nth-child(2)').exists();
},
modgame: function (modinput) {
    var gameeditdom = 'div#game table tbody tr.spools_models_game_'+modinput.expectedkey;
    S(gameeditdom+' a.edit').exists().click();
    S(gameeditdom+' td.idGameBrd').exists( function () {
        S(gameeditdom+' td.TeamNameA input[name=TeamNameA]').click().type('\b\b\b\b\b\b\b\b'+modinput.TeamNameA);
        //S(".spools_models_game_1 input[name=TeamNameB]").type("CHANGED");
        S(gameeditdom+' input[value=Update]').click();
    });
},
checkgame: function(checkinput) {
    var gamecheckdom = 'div#game table tbody tr.spools_models_game_'+checkinput.expectedkey;
    //--Check what create22 should have done
    S(gamecheckdom).exists(function () {
        ok(S(gamecheckdom+' td.idGameBrd').text().match(checkinput.idGameBrd), '<<BEGIN>>: gamekey '+checkinput.expectedkey);
        equal(S(gamecheckdom+' td.TypeSport').text(), checkinput.TypeSport, 'TypeSport');
        equal(S(gamecheckdom+' td.TeamNameA').text(), checkinput.TeamNameA, 'TestTeamA');
        equal(S(gamecheckdom+' td.TeamNameB').text(), checkinput.TeamNameB, 'TestTeamB');
        equal(S(gamecheckdom+' td.TeamAScore').text(), checkinput.TeamAScore, 'TeamAScore');
        equal(S(gamecheckdom+' td.TeamBScore').text(), checkinput.TeamBScore, 'TeamBScore');
        equal(S(gamecheckdom+' td.message').text(), checkinput.message, 'message');
        equal(S(gamecheckdom+' td.GameState').text(), checkinput.GameState, 'GameState');
    });
 },
viewgame: function(viewinput) {
    var gameeditdom = 'div#game table tbody tr.spools_models_game_'+viewinput.expectedkey;
    S(gameeditdom+' a.view').exists().click();

}
});
//-TEST1
test("GAMES: 01-SmokeDefault", function () {
    expect(9);
    ok(S('.game').size() >= 1, "There is at least one game");
});
//-TEST2
test("GAMES: 02-create22-check22", function () {
    expect(16);
    //-SETUP now this.nukeuseranddata();
    var myUsergameinput = this.defaultgameinput();
    myUsergameinput.expectedkey = 1;
    myUsergameinput.idGameBrd = '22';
    this.creategame(myUsergameinput);
    this.checkgame(myUsergameinput);
});
//-TEST3
test("GAMES: 03-create", function () {
    expect(24); //8 per setup and check
    //-SETUP now this.nukeuseranddata();
    var myUsergameinput = {
        expectedkey: 1,
        idGameBrd: '33',
        TypeSport: 'Football',
        TeamNameA: 'Test',
        TeamNameB: 'Test',
        TeamAScore: 0,
        TeamBScore: 0,
        message: 'New Game',
        GameState: 'JoinGame'
        };
    this.creategame(myUsergameinput);
    this.checkgame(myUsergameinput);
    myUsergameinput.TeamNameA = "THIS";
    this.modgame(myUsergameinput);
    //--the mod acctuall appends via the type command
    myUsergameinput.TeamNameA = "TestTHIS";
    this.checkgame(myUsergameinput);
});
//-TEST4
test("GAMES: 04-Token picks", function () {
    //-SETUP now this.nukeuseranddata();
    var gamedom = {
        key: '0',
        glist: 'div#game',
        gdata_: 'div#game table tbody tr.spools_models_game_',
        gview: ' td a.view',
        gedit: ' td a.edit',
        gupdate: ' td input.update',
        gjoingame: ' td.GameState select[name=GameState] option[value=JoinGame]',
        gstartgame: ' td.GameState select[name=GameState] option[value=StartGame]',
        gendgame: ' td.GameState select[name=GameState] option[value=EndGame]',
        gscoreplus: ' div.teamscore input.gamescoreplus',
        gscoreminus: ' div.teamscore input.gamescoreminus',
        idGameBrd: '0',
        TypeSport: 'Baseball',
        TeamNameA: 'Home Team',
        TeamNameB: 'Away Team',
        TeamAScore: '0',
        TeamBScore: '0',
        GameState: 'JoinGame'
        };
    var xxtokendom = {
        key: 0,
        tlist: 'div#token',
        tdata_: 'div#token tr.spools_models_token_',
        tclick: ' td a.pick ',
        idGamePos: 'Test',
        idGameBrd: 'Test',
        idPlayer: 'game',
        idOwner: 'game',
        idCreator: 'New Game',
        state: 'play'
        };
    var tokendom = {
        key: 0,
        tlist: 'div#token',
        tdata_: 'div#token div#CATCRAP div#gameContainer div#gameBG div.boardSection table#PGSpoolsTable tbody tr td.spools_models_token_',
        tclick: ' a.pick ',
        idGamePos: 'Test',
        idGameBrd: 'Test',
        idPlayer: 'game',
        idOwner: 'game',
        idCreator: 'New Game',
        state: 'play'
        };
    /*TODO: put cookie stuff in a better place */
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
    //--Look at the token board verify Board 0 the default
    S(gamedom.gdata_+gamedom.key+gamedom.gview).exists().click();
    //alert(gamedom.gdata_+gamedom.key+gamedom.gview);
    //S("div#game table tbody tr.spools_models_game_0 td a.view").exists().click();
    S(tokendom.tlist).exists(function (){
        var myidPlayer = readCookie('idPlayer');
        ok( 1, "<<BEGIN>>: Verify board 0 default token data");
        
        //S("div#game table tbody tr.spools_models_game_0 td a.view").exists().click();
        /*
        S(tokendom.tdata_+"1 td.idGameBrd").exists( function () {
            ok( S(tokendom.tdata_+"1 .idGameBrd").text().match(/0/), "Verify board 0 idGameBrd");
            for (var i=1;i <= 25;i++) { //-check all tokens
            ok( S(tokendom.tdata_+i+" .idPlayer").text().match(myidPlayer), ("Verify Token "+i+" idPlayer"));
            }
        });
        */
        for (var i=1;i <= 3;i++) { //-pick some tokens
        S(tokendom.tdata_+i+tokendom.tclick).exists().click();
        S.wait(1000);
        }
        /*
        S("div#token tr.spools_models_token_1 td.idGameBrd").exists( function () {
            for (var i=1;i <= 3;i++) { //-check you picks
            ok( S(tokendom.tdata_+i+" .idOwner").text().match(myidPlayer), "Verify Token "+i+" idPlayer is idOwner");
            }
            ok( S(tokendom.tdata_+"4 .idOwner").text().match(tokendom.idOwner), "Verify Token 4 game is idOwner");
            ok( S(tokendom.tdata_+"5 .idOwner").text().match(/game/), "Verify Token 5 game is idOwner");
        });
        S.open("//spools/spools.html");
        S(tokendom.tdata_+"1 td.idGameBrd").exists( function () {
            ok( S(tokendom.tdata_+"1 .idPlayer").text().match(/MINE/), "Verify Token 1 idPlayer is MINE");
            ok( S(tokendom.tdata_+"2 .idPlayer").text().match("MINE"), "Verify Token 2 idPlayer is MINE");
            ok( S(tokendom.tdata_+"3 .idPlayer").text().match('MINE'), "Verify Token 3 idPlayer is MINE");
            ok( S(tokendom.tdata_+"4 .idPlayer").text().match(myidPlayer), "Verify Token 4 idPlayer is myidPlayer");
            ok( S(tokendom.tdata_+"5 .idPlayer").text().match(myidPlayer), "Verify Token 5 idPlayer is myidPlayer");
            ok( S(tokendom.tdata_+"4 .idOwner").text().match("game"), "Verify Token 4 idOwner is game");
            ok( S(tokendom.tdata_+"5 .idOwner").text().match(/game/), "Verify Token 5 idOwner is game");
        });
        */
       S.open("//spools/spools.html");
       S(gamedom.gdata_+gamedom.key+gamedom.gview).exists().click();

    });
    /*
    S.wait(2000);
    //--Go Start Game
    S(gamedom.gdata_+"0"+gamedom.gedit).exists().click();
    S(gamedom.gdata_+"0"+gamedom.gstartgame).exists().click();
    S(gamedom.gdata_+"0"+gamedom.gupdate).exists().click();
    S.wait(2000);
    S(gamedom.gdata_+"0"+gamedom.gview).exists().click();
    S.wait(2000);
    //--Go Add Score
    S(gamedom.gdata_+"0"+gamedom.gedit).exists().click();
    S(gamedom.gdata_+"0 td.TeamAScore"+gamedom.gscoreplus).exists().click().click().click();
    S(gamedom.gdata_+"0 td.TeamBScore"+gamedom.gscoreplus).exists().click().click().click().click().click();
    S(gamedom.gdata_+"0"+gamedom.gupdate).exists().click();
    S.wait(2000);
    S(gamedom.gdata_+"0"+gamedom.gview).exists().click();
    S.wait(2000);
    //--Go End Game
    S(gamedom.gdata_+"0"+gamedom.gedit).exists().click();
    S(gamedom.gdata_+"0"+gamedom.gendgame).exists().click();
    S.wait(2000);
    S(gamedom.gdata_+"0"+gamedom.gupdate).exists().click();
    S(gamedom.gdata_+"0"+gamedom.gview).exists().click();
*/
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