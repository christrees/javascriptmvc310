<?php
include_once 'common.php';

//--OK we should have a $gamebrdout array
//--We need to set the user display field so this user can click and buy tokens from the board default
for ($i = 1; $i <= $theGame["gamegridinit"]["gametotaltokens"]; $i++) {
    if ($gamebrdout[$i]["idOwner"] == $theGame["gamegridinit"]["gametotaltokens"]) {
        $gamebrdout[$i]["idPlayer"] = $idPlayer;
    }
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
