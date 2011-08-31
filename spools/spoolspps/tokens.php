<?php
include_once 'common.php';
//--ALL tokens request are for single token types
//--The board is determined by the post value
    if (!isset($_POST["idGameBrd"])) { //-- got no POST value this would be new tpken - we can't do this
        $idGameBrd = 0; //dump stupid shit stuff on the default board
    } else $idGameBrd = $_POST["idGameBrd"];
//--Pull the tokenboard out of storage
//-- Get the right board for the user
//-- Default the board to the last one
$gamebrdfilename = $theGame["gamesinit"]["filepath"] . $idGameBrd . $theGame["boardbank"]["filename"];
if (file_exists($gamebrdfilename)) {
        $gamebrdout = unserialize(file_get_contents($gamebrdfilename));
} else  $gamebrdout = init_newboard($gamebrdfilename, $idGameBrd, $theGame);
//--OK we should have a $gamebrdout array
//
$idGamePos = isset($_POST["idGamePos"]) ? $_POST["idGamePos"] : -1;
//--User just clicked on a token and sent us an update.. lets assign it to him
    if (($gamebrdout[$idGamePos]["idOwner"] == $theGame["tokendefault"]["idOwner"]) && ($gamebankout[$gamekey]["GameState"] == "JoinGame"))  {
     $gamebrdout[$idGamePos]["idOwner"] = isset($_POST['idPlayer']) ? $_POST['idPlayer'] : 'xxxx';
    }
        //-- Store the new board <before we set idPlayer to responce>
    $fp = fopen($gamebrdfilename, 'w+') or die("I could not open $gamebrdfilename.");
    fwrite($fp, serialize($gamebrdout));
    fclose($fp);
    //--Give the updated data back
     $gamebrdout[$idGamePos]["idPlayer"] = $_POST['idPlayer'];
    echo json_encode($gamebrdout[$idGamePos]);
//header('Content-type: application/json');
//echo $_GET['callback']. '('.json_encode(array('dataset'=>$dataset)) .')';
//echo $_GET['callback']. '('. $dataset .')';
//echo $dataset;
?>
