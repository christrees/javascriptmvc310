/*global module: true, ok: true, equals: true, S: true, test: true */
module("game", {
setup: function () {
    this.nukeuseranddata();
    //--Default first index should be 0 and increment from there
    S('.gameview').exists(function () {
        ok(S('.spools_models_game_0').exists(), "default game model exists");
        ok(S('.gameview').exists(), "gameview class exists");
        ok(S('.createdBy').text().match(/Sport:/), "CreatedBy class div Sport:");
        ok(S('.header').text().match(/vs/), "header class div with vs");
        ok(S('.gameview').text().match(/view/), "Default gameview link");
    });
},
nukeuser: function () {
    S.open("//spools/spoolspps/nukecookieandsession.php");
    S("[type=submit]").exists();
    // open the page
    S.open("//spools/joingame.html");
    S('.gameview').exists();
},
nukeuseranddata: function () {
    //--Clear the data so we start from scratch.
    S.open("//spools/spoolspps/nukecookieandsession.php");
    S("[type=submit]").exists().click();
    // open the page
    S.open("//spools/joingame.html");
    S('.gameview').exists();
},
defaultgameinput: function () {
  var defautinput = {
        expectedkey: 0,
        idGameBrd: 'test01brd',
        TypeSport: 'Football',
        TeamNameA: 'Home Team',
        TeamNameB: 'Away Team',
        TeamAScore: 0,
        TeamBScore: 0,
        message: 'New Game',
        GameState: 'JoinGame',
        tokensperboard: 25,
        gamekeylistdom: 'div.gamelist table tbody tr.spools_models_game_',
        gamecreatedom: 'div.gamenew form ',
        gamecreatesubmit: 'div.infoSection input[type=submit] ',
        tokenkeyviewdom: 'div.tokenview div.boardSection table tbody tr td.spools_models_token_',
        tokennotpickedtext: 'play'
   };
   return defautinput;
},
creategame: function (gameinput) {
    var gamecreatedom = 'div.gamenew form ';
    var editvals = 'div.infoSection div#neweditvalue ';
    var submitbutton = 'div.infoSection input[type=submit] ';
    S('#litab2').exists().click();
    //alert('TeamNameA is: '+gameinput.TeamNameA+' idGameBrd is: '+gameinput.idGameBrd);
    S(gamecreatedom+submitbutton).exists( function () {
        S(gamecreatedom+editvals+'input[name=idGameBrd]').type(gameinput.idGameBrd);
        S(gamecreatedom+editvals+'input[name=TeamNameA]').type(gameinput.TeamNameA);
        S(gamecreatedom+editvals+'input[name=TeamNameB]').type(gameinput.TeamNameB);
        S(gamecreatedom+submitbutton).click();
    });
},
modgame: function (modinput) {
    var gameeditdom = 'div.gamelist table tbody tr.spools_models_game_'+modinput.expectedkey;
    S(gameeditdom+' a.gameview').exists().click();
    S(gameeditdom+' td.idGameBrd').exists( function () {
        S(gameeditdom+' td.TeamNameA input[name=TeamNameA]').click().type('\b\b\b\b\b\b\b\b'+modinput.TeamNameA);
        //S(".spools_models_game_1 input[name=TeamNameB]").type("CHANGED");
        S(gameeditdom+' input[value=Update]').click();
    });
},
checkgame: function(checkinput) {
    var gamecheckdom = 'div#game table tbody tr.spools_models_game_'+checkinput.expectedkey;
    S(gamecheckdom).exists(function () {
        equal(S(gamecheckdom+' td .createdBy').text(), ('Sport: '+checkinput.TypeSport), 'TypeSport');
        equal('SHIT', 'SHIT', 'SHIT Check');
        equal(S(gamecheckdom+' td .header').text(), (checkinput.TeamNameA+' vs '+checkinput.TeamNameB), 'Header Check');
    });
 },
viewgame: function(viewinput) {
    var gameeditdom = 'div#game table tbody tr.spools_models_game_'+viewinput.expectedkey;
    S(gameeditdom+' a.view').exists().click();

}
});
//-TEST1
test("GAMES: 01-SmokeDefault", function () {
    expect(6);
    ok(S('.gamelist').size() >= 1, "There is at least one game");
});
//-TEST2
test("GAMES: 02-create", function () {
    expect(8); //8 per setup and check
    //-SETUP now this.nukeuseranddata();
    var myUsergameinput = this.defaultgameinput();
    myUsergameinput.expectedkey = 1;
    myUsergameinput.idGameBrd = 'test02brd';
    this.creategame(myUsergameinput);
    S('#litab1').exists().click();
    this.checkgame(myUsergameinput);
});
//-TEST3
test("GAMES: 03-view-play", function () {
    expect(104); //8 per setup and check
    //-SETUP now this.nukeuseranddata();
    var myUsergameinput = this.defaultgameinput();
        //TODO: put cookie stuff in a better place
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
    var myidPlayer = readCookie('idPlayer');
    var myidPlayer2;
    ok( 1, "<<BEGIN-3-1>>: Verify board 0 default tokens are play");
    S(myUsergameinput.gamekeylistdom+myUsergameinput.expectedkey+' a.gameview').exists().click();
    S(myUsergameinput.tokenkeyviewdom+myUsergameinput.tokensperboard+" a.pick").exists( function(){
        for (var i=1;i <= myUsergameinput.tokensperboard;i++) { //-pick some tokens
            equal(S(myUsergameinput.tokenkeyviewdom+i+" a.pick").text(), myUsergameinput.tokennotpickedtext, "Token "+i+" is play");
        }
    });
    ok( 1, "<<BEGIN-3-2>>: Click 3 tokens user is: "+myidPlayer);
    S(myUsergameinput.tokenkeyviewdom+'1 a.pick').exists().click();
    S(myUsergameinput.tokenkeyviewdom+'2 a.pick').exists().click();
    S(myUsergameinput.tokenkeyviewdom+'3 a.pick').exists().click();
    ok( 1, "<<BEGIN-3-3>>: Verfiy tokens are: "+myidPlayer);
    S(myUsergameinput.tokenkeyviewdom+'3 a.pick').missing(function(){
        for (var i=1;i <= 3;i++) { //-pick some tokens
            equal(S(myUsergameinput.tokenkeyviewdom+i).text(), myidPlayer, "Token "+i+" is "+myidPlayer+" ?? ");
        }
        for (var a=4;a <= myUsergameinput.tokensperboard;a++) { //-pick some tokens
            equal(S(myUsergameinput.tokenkeyviewdom+a+" a.pick").text(), myUsergameinput.tokennotpickedtext, "Token "+a+" is play");
        }
        S(myUsergameinput.tokenkeyviewdom+'4 a.pick').exists().click();
    });
    S.wait(5000);
    this.nukeuser();
    S.wait(5000);
    S(myUsergameinput.gamekeylistdom+"0").exists();
    S('#litab1').exists().click();
    S.wait(5000);
    S(myUsergameinput.gamekeylistdom+"0").exists(function(){
        myidPlayer2 = readCookie('idPlayer');
    });
    ok( 1, "<<BEGIN-3-4>>: Got new player: "+myidPlayer2+" Verify pick tokens");
    S(myUsergameinput.gamekeylistdom+myUsergameinput.expectedkey+' a.gameview').exists().click();
    S(myUsergameinput.tokenkeyviewdom+myUsergameinput.tokensperboard+" a.pick").exists( function(){
        for (var i=5;i <= myUsergameinput.tokensperboard;i++) { //-Verify pick clicks
            equal(S(myUsergameinput.tokenkeyviewdom+i+" a.pick").text(), myUsergameinput.tokennotpickedtext, "Token "+i+" is play");
        }
    });
    ok( 1, "<<BEGIN-3-5>>: Click 3 tokens user is: "+myidPlayer2);
    S(myUsergameinput.tokenkeyviewdom+'5 a.pick').exists().click();
    S(myUsergameinput.tokenkeyviewdom+'6 a.pick').exists().click();
    S(myUsergameinput.tokenkeyviewdom+'7 a.pick').exists().click();
    S.wait(2000);
    ok( 1, "<<BEGIN-3-6>>: Verfiy tokens are: "+myidPlayer2);
    S(myUsergameinput.tokenkeyviewdom+'7 a.pick').missing(function(){
        for (var i=5;i <= 7;i++) { //-pick verify tokens
            equal(S(myUsergameinput.tokenkeyviewdom+i).text(), myidPlayer2, "Token "+i+" is "+myidPlayer2+" ?? ");
        }
        for (var a=8;a <= myUsergameinput.tokensperboard;a++) { //-pick other tokens
            equal(S(myUsergameinput.tokenkeyviewdom+a+" a.pick").text(), myUsergameinput.tokennotpickedtext, "Token "+a+" is play");
        }
        S(myUsergameinput.tokenkeyviewdom+'8 a.pick').exists().click();
    });
    ok( 1, "<<BEGIN-3-7>>: Verify User Switch and Pick");
    S(myUsergameinput.tokenkeyviewdom+'8 a.pick').missing(function(){
        S(myUsergameinput.tokenkeyviewdom+'9 a.pick').exists().click();
        S(myUsergameinput.tokenkeyviewdom+'10 a.pick').exists().click();
        S(myUsergameinput.tokenkeyviewdom+'11 a.pick').exists().click();
    });
});