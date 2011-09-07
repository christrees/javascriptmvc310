<?php
include_once 'common.php';
//--OK we should have a $gamebrdout array from common
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
