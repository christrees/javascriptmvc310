<?php
include_once 'common.php';

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

for ($i = 1; $i <= $theGame["gamegridinit"]["gametotaltokens"]; $i++) {
    if ($gamebrdout[$i]["idOwner"] == $theGame["gamegridinit"]["gamedefaulttokenowner"]) {
        if ($gamebankout[$gamekey]["GameState"] == "JoinGame") {
            $gamebrdout[$i]["idPlayer"] = $idPlayer;
        } else {
            $gamebrdout[$i]["idPlayer"] = "BANK";
        }
    } elseif ($gamebrdout[$i]["idOwner"] == $_COOKIE["idPlayer"]) { 
        $gamebrdout[$i]["idPlayer"] = "MINE";
    } else { 
        $gamebrdout[$i]["idPlayer"] = "GONE";
    }
    if ($gamebankout[$gamekey]["GameState"] != "JoinGame") {$gamebrdout[$i]["state"] = "LOCK";}
}

//--Send the game to the user
echo '[';
for ($i = 1; $i <= $theGame["gamegridinit"]["gametotaltokens"]; $i++) {
    echo json_encode($gamebrdout[$i]);
     if ( $i < $theGame["gamegridinit"]["gametotaltokens"] ) {echo ',';} //-- comma between all but last
}
echo ']';

//echo $_GET['callback']. '('.json_encode(array('dataset'=>$dataset)) .')';
//echo $_GET['callback']. '('. $dataset .')';
//echo $dataset;
//echo "Hello Chris.. this MESS YOU UP?";
?>
