<?php
session_start();
//header('Content-type: application/json');
//--REFERENCE
//http://www.ibm.com/developerworks/library/os-php-readfiles/
//
//-- Check cookie
//-- idPlayer and idGameBrd should always be passed in the cookie.
isset($_COOKIE["idPlayer"])   ? ($idPlayer  = $_COOKIE["idPlayer"])   : ($idPlayer  = "CRAP_GETPLAYER") ;
isset($_COOKIE["idGameBrd"])  ? ($idGameBrd = $_COOKIE["idGameBrd"])  : ($idGameBrd = "CRAP_NOBOARD") ;
if (isset($_POST['idPlayer'])) { //-- post should have id
//-- if your using tokens you should be passing me this stuff on POST
	$idCreator       = (isset($_POST['idCreator']))  ? ($_POST['idCreator'])   : ('UIDfuckd');
	$idGameBrd_post  = (isset($_POST['idGameBrd']))  ? ($_POST['idGameBrd'] )  : ('GameBrdFd');
        $idGamePos       = (isset($_POST['idGamePos']))  ? ($_POST['idGamePos'])   : ('DeBugFd');
	$idOwner         = (isset($_POST['idOwner']))    ? ($_POST['idOwner'] )    : ('DeBugFd');
        $idPlayer_post   = (isset($_POST['idPlayer']))   ? ($_POST['idPlayer'])    : ('DeBugFd');
	$state           = (isset($_POST['state']))      ? ($_POST['state'] )      : ('DeBugFd');
	$id_post   = (isset($_POST['id']))    ? ($_POST['id']  )   : ('idfuckd');
}
$idGameBrd_post = "0";
if (isset($_POST['idGameBrd'])) { //-- post should have board for game
        //-- if your using games you should be passing me this stuff on POST
	$idGameBrd_post  = (isset($_POST['idGameBrd']))  ? ($_POST['idGameBrd'] )  : ('GameBrdFd');
	$TeamNameA_post  = (isset($_POST['TeamNameA']))  ? ($_POST['TeamNameA']  ) : ('TeamNameAfuckd');
	$TeamNameB_post  = (isset($_POST['TeamNameB']))  ? ($_POST['TeamNameB']  ) : ('TeamNameBfuckd');
	$TypeSport_post  = (isset($_POST['TypeSport']))  ? ($_POST['TypeSport']  ) : ('TypeSportfuckd');
	$TeamAScore_post  = (isset($_POST['TeamAScore']))  ? ($_POST['TeamAScore']  ) : ('TeamAScorefuckd');
	$TeamBScore_post  = (isset($_POST['TeamBScore']))  ? ($_POST['TeamBScore']  ) : ('TeamBScorefuckd');
	$message_post   = (isset($_POST['message']))    ? ($_POST['message']  )   : ('messagefuckd');
	$id_post   = (isset($_POST['id']))    ? ($_POST['id']  )   : ('idfuckd');
}
//-- Get setup and then the right board for the user
$theGame = parse_ini_file("gameboard.ini", true);
//--Pull the Users games out of storage
if ($idPlayer == "CRAP_GETPLAYER") { //-- Need to set a new user
    $mySession = session_id();
    $idPlayer = substr_replace($mySession, '', 3, -1);
    setcookie("idPlayer", $idPlayer);
}
if ($idGameBrd !== $idGameBrd_post) { //-- The board and board cookie don't match
    $idGameBrd = "0"; //--
}
//-- We have user for sure now look for the game bank
$gamesbankbasename = $theGame["gamesinit"]["filepath"] . $idPlayer . $theGame["gamesinit"]["filename"];
if (file_exists($gamesbankbasename)) { //-- Get the right games bank for the user
    $gamebankout = unserialize(file_get_contents($gamesbankbasename));
} else { //-- it's a new user with no boards so write the bank with the loaded default
    $gamebankout = init_newuser($idPlayer, $theGame);
}
//--OK we should have the user info now figure out what board to load
//--Respect the cookie, but if it was not set set one
if ($idGameBrd == "CRAP_GETNBOARD") { //-- set the last board in the bank
    $lastgameboard = end($gamebankout);
    $idGameBrd = $lastgameboard["idGameBrd"];
    //--NOTE: let the client tell us the cookie -
    //setcookie("idGameBrd", $idGameBrd);
}  //--NOTE: If we post we need to pull another board
//--Pull the tokenboard out of storage
//-- Get the right board for the user
//-- Default the board to the last one
$gamebrdfilename = $theGame["gamesinit"]["filepath"] . $idGameBrd . $theGame["boardbank"]["filename"];
if (file_exists($gamebrdfilename)) {
        $gamebrdout = unserialize(file_get_contents($gamebrdfilename));
} else  $gamebrdout = init_newboard($gamebrdfilename, $idGameBrd, $theGame);
//--
//-- FUNCTIONS
//-- New User
function init_newuser($idPlayer, $theGame) {
    $gamebankout[0] = $theGame["gamesbankinit"];
    $gamesbankbasename = $theGame["gamesinit"]["filepath"] . $idPlayer . $theGame["gamesinit"]["filename"];
    $fp = fopen($gamesbankbasename, 'w+') or die("I could not open $gamesbankbasename.");
    fwrite($fp, serialize($gamebankout));
    fclose($fp);
    return $gamebankout;
}
//-- New Board
function init_newboard($filename, $idGameBrd, $theGame) { //-- THIS is our crap board no brd cookie
    for ($i = 1; $i <= $theGame["gamegridinit"]["gametotaltokens"]; $i++) {
        //-- Generate the grid object
         $gamebrdout[$i] = $theGame["tokendefault"];
         $gamebrdout[$i]["idGameBrd"] = $idGameBrd;
         $gamebrdout[$i]["idGamePos"] = $i;
         $gamebrdout[$i]["id"] = $i;
    }
    //-- Store the new board
    $fp = fopen($filename, 'w+') or die("I could not open $filename.");
    fwrite($fp, serialize($gamebrdout));
    fclose($fp);
    return $gamebrdout;
}
//--We should have a user data and board at this point
?>
