<?php
session_start();
//header('Content-type: application/json');
//--REFERENCE
//http://www.ibm.com/developerworks/library/os-php-readfiles/
//
//-- Check cookie
//-- idPlayer and idGameBrd should always be passed in the cookie.
isset($_COOKIE["idGameBrd"])  ? ($idGameBrd = $_COOKIE["idGameBrd"])  : ($idGameBrd = "CRAP_NOBOARD") ;

//-- Get setup and then the right board for the user
$theGame = parse_ini_file("gameboard.ini", true);
//--Figure out the user
if (!isset($_COOKIE["idPlayer"])) { //-- No player cookie to set a new user
    $mySession = session_id();
    $idPlayer = substr_replace($mySession, '', 3, -1);
    setcookie("idPlayer", $idPlayer);
} else $idPlayer  = $_COOKIE["idPlayer"];
//-- We now have user and a board references now look for the game bank
$gamesbankbasename = $theGame["gamesinit"]["filepath"] . $theGame["gamesinit"]["gamegroup"] . $theGame["gamesinit"]["filename"];
if (file_exists($gamesbankbasename)) { //-- Get the right games bank for the user
    $gamebankout = unserialize(file_get_contents($gamesbankbasename));
} else { //-- it's a new user with no boards so write the bank with the loaded default
    $gamebankout = init_newuser($gamesbankbasename, $theGame);
}

//--
//-- FUNCTIONS
//-- New User
function init_newuser($gamesbankbasename, $theGame) {
    $gamebankout[0] = $theGame["gamesbankinit"];
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
