<?php
include_once 'common.php';
//--OK we should have a $gamebankout array
//--User just sent us an update
//-- OK if the user attemps to post a board, we need see if it exist
/*
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
//    $needle = array("idGameBrd" => $idGameBrd_post);
//    $haystack = $gamebankout;
//    $key = findGameBrd($needle, $haystack);
//    if ($key) {
*/
    if (!isset($_POST['id'])) {
     $newGame = $theGame["gamesbankinit"];
     $newGame["id"] = count($gamebankout);
     array_push($gamebankout, $newGame);
     end($gamebankout);
     $key = key($gamebankout);
    } else $key = $_POST['id'];
     $gamebankout[$key]["idGameBrd"] = (isset($_POST['idGameBrd']))  ? ($_POST['idGameBrd'] )  : ('GameBrdFd');
     $gamebankout[$key]["TeamNameA"] = (isset($_POST['TeamNameA']))  ? ($_POST['TeamNameA']  ) : ('TeamNameAfuckd');
     $gamebankout[$key]["TeamNameB"] = (isset($_POST['TeamNameB']))  ? ($_POST['TeamNameB']  ) : ('TeamNameBfuckd');
     $gamebankout[$key]["TypeSport"] = (isset($_POST['TypeSport']))  ? ($_POST['TypeSport']  ) : ('TypeSportfuckd');
     $gamebankout[$key]["TeamAScore"] = (isset($_POST['TeamAScore']))  ? ($_POST['TeamAScore']  ) : ('TeamAScorefuckd');
     $gamebankout[$key]["TeamBScore"] = (isset($_POST['TeamBScore']))  ? ($_POST['TeamBScore']  ) : ('TeamBScorefuckd');
     $gamebankout[$key]["GameState"] = (isset($_POST['GameState']))    ? ($_POST['GameState']  )   : ('GameStatefuckd');
     if ($_POST['GameState'] != 'JoinGame') { //-- assign keys when not in JoinGame
        $gamebankout[$key]["TeamARow1"] = "0/5";
        $gamebankout[$key]["TeamARow2"] = "1/6";
        $gamebankout[$key]["TeamARow3"] = "2/7";
        $gamebankout[$key]["TeamARow4"] = "3/8";
        $gamebankout[$key]["TeamARow5"] = "4/9";
        $gamebankout[$key]["TeamBRow1"] = "0/5";
        $gamebankout[$key]["TeamBRow2"] = "1/6";
        $gamebankout[$key]["TeamBRow3"] = "2/7";
        $gamebankout[$key]["TeamBRow4"] = "3/8";
        $gamebankout[$key]["TeamBRow5"] = "4/9";
     }
     $gamebankout[$key]["message"]   = (isset($_POST['message']))    ? ($_POST['message']  )   : ('messagefuckd');
     $out = $gamebankout[$key];
    //-- Store the new games list
    $fp = fopen($gamesbankbasename, 'w+') or die("I could not open $gamesbankbasename.");
    fwrite($fp, serialize($gamebankout));
    fclose($fp); 

// echo '[';
echo json_encode($out);
// echo ']';
?>
