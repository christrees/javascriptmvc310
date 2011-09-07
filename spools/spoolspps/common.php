<?php
session_cache_limiter( 'nocache' );
session_start();
header( 'Cache-Control: no-cache, must-revalidate, post-check=3600, pre-check=3600' );
//
//header('Content-type: application/json');
//--REFERENCE
//http://www.ibm.com/developerworks/library/os-php-readfiles/
//http://php.net/manual/en/function.session-cache-limiter.php
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
    //setcookie("idPlayer", $idPlayer);
    setcookie ("idPlayer", $idPlayer, time() + 3600, "/");
} else $idPlayer  = $_COOKIE["idPlayer"];
//-- We now have user and a board references now look for the game bank
$gamesbankbasename = $theGame["gamesinit"]["filepath"] . $theGame["gamesinit"]["gamegroup"] . $theGame["gamesinit"]["filename"];
if (file_exists($gamesbankbasename)) { //-- Get the right games bank for the user
    $gamebankout = unserialize(file_get_contents($gamesbankbasename));
} else { //-- it's a new user with no boards so write the bank with the loaded default
    $gamebankout = init_newuser($gamesbankbasename, $theGame);
}

//--OK we should have the user info now figure out what board to load
//--We only need a board if we are dealing a Token request
//--ALL token requests are for full board view so use the view cookie
//--Respect the cookie, but if it was not set set one
    //--Respect the wish of the cookie only if it is set
    if (!isset($_COOKIE["idGameBrd"])) { //-- got no cookie value so load the last board in list
        $lastgameboard = end($gamebankout);
        $idGameBrd = $lastgameboard["idGameBrd"];
        //--NOTE: set the client cookie -
        //setcookie("idGameBrd", $idGameBrd);
        //setcookie ("idGameBrd", "0", time() + 1, "/");
    } else $idGameBrd = $_COOKIE["idGameBrd"];
//--Pull the tokenboard out of storage
//-- Get the right board for the user
//-- Default the board to the last one
$gamebrdfilename = $theGame["gamesinit"]["filepath"] . $idGameBrd . $theGame["boardbank"]["filename"];
if (file_exists($gamebrdfilename)) {
        $gamebrdout = unserialize(file_get_contents($gamebrdfilename));
} else  $gamebrdout = init_newboard($gamebrdfilename, $idGameBrd, $theGame);

//--OK we should have a $gamebrdout array
//
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
//-- OK if the user attemps to post a board, we need to find the key
function findGameBrd($needle, $haystack) {
        if (empty($needle) || empty($haystack)) {
            return false;
        }
        foreach ($haystack as $key => $value) {
            $exists = 0;
            foreach ($needle as $nkey => $nvalue) {
                if (!empty($value[$nkey]) && $value[$nkey] == $nvalue) {
                    $exists = 1;
                } else {
                    $exists = 0;
                }
            }
            if ($exists) return $key;
        }
        return false;
}
// Not using needle haystack lookup via $idGameBrd now...
    $needle = array("idGameBrd" => $idGameBrd);
    $haystack = $gamebankout;
    $gamekey = findGameBrd($needle, $haystack);
//--We should have a user data and board at this point
?>
