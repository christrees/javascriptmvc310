<?php
include_once 'common.php';
//--OK we should have a $gamebrdout array
//--User just clicked on a token and sent us an update.. lets assign it to him
    if ($gamebrdout[$idGamePos]["idOwner"] == $theGame["tokendefault"]["idOwner"]) {
     $gamebrdout[$idGamePos]["idOwner"] = $idPlayer;
    }
        //-- Store the new board
    $fp = fopen($filename, 'w+') or die("I could not open $filename.");
    fwrite($fp, serialize($gamebrdout));
    fclose($fp);
    //--Give the updated data back
    echo json_encode($gamebrdout[$idGamePos]);
//header('Content-type: application/json');
//echo $_GET['callback']. '('.json_encode(array('dataset'=>$dataset)) .')';
//echo $_GET['callback']. '('. $dataset .')';
//echo $dataset;
?>
