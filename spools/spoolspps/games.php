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
// This needs to be randomized and written to the game data in the matrix...
    $tokenmap = array(
      0 => array ( 0 => 1, 1 => 2, 2 => 3, 3 => 4, 4 => 5 ),
      1 => array ( 0 => 6, 1 => 7, 2 => 8, 3 => 9, 4 => 10 ),
      2 => array ( 0 => 11, 1 => 12, 2 => 13, 3 => 14, 4 => 15 ),
      3 => array ( 0 => 16, 1 => 17, 2 => 18, 3 => 19, 4 => 20 ),
      4 => array ( 0 => 21, 1 => 22, 2 => 23, 3 => 24, 4 =>25  ),
      5 => array ( 5 => 1, 6 => 2, 7 => 3, 8 => 4, 9 => 5 ),
      6 => array ( 5 => 6, 6 => 7, 7 => 8, 8 => 9, 9 => 10 ),
      7 => array ( 5 => 11, 6 => 12, 7 => 13, 8 => 14, 9 => 15 ),
      8 => array ( 5 => 16, 6 => 17, 7 => 18, 8 => 19, 9 => 20 ),
      9 => array ( 5 => 21, 6 => 22, 7 => 23, 8 => 24, 9 =>25  )
    );
    if (!isset($_POST['id'])) {
     $newGame = $theGame["gamesbankinit"];
     $newGame["id"] = count($gamebankout);
     $newGame["idGameBrd"] = 'bid'.((string)$newGame["id"]).'uid'.$_COOKIE["idPlayer"];
     //$newGame["idGameBrd"] = "bid001";
     array_push($gamebankout, $newGame);
     end($gamebankout);
     $key = key($gamebankout);
    } else $key = $_POST['id'];
     //$gamebankout[$key]["idGameBrd"] = (isset($_POST['idGameBrd']))  ? ($_POST['idGameBrd'] )  : ('idGameBrdDefault');
     //--Joe wants auto name of board 
     $gamebankout[$key]["Official"] = (isset($_POST['Official']))  ? ($_POST['Official']  ) : ('OfficialDefault');
     $gamebankout[$key]["StartTime"] = (isset($_POST['StartTime']))  ? ($_POST['StartTime']  ) : ('StartTimeDefault');
     $gamebankout[$key]["TeamNameA"] = (isset($_POST['TeamNameA']))  ? ($_POST['TeamNameA']  ) : ('TeamNameADefault');
     $gamebankout[$key]["TeamNameB"] = (isset($_POST['TeamNameB']))  ? ($_POST['TeamNameB']  ) : ('TeamNameBDefault');
     $gamebankout[$key]["TypeSport"] = (isset($_POST['TypeSport']))  ? ($_POST['TypeSport']  ) : ('TypeSportDefault');
     $gamebankout[$key]["TeamAScore"] = (isset($_POST['TeamAScore']))  ? ($_POST['TeamAScore']  ) : ('TeamAScoreDefault');
     $gamebankout[$key]["TeamBScore"] = (isset($_POST['TeamBScore']))  ? ($_POST['TeamBScore']  ) : ('TeamBScoreDefault');
     $gamebankout[$key]["GameState"] = (isset($_POST['GameState']))    ? ($_POST['GameState']  )   : ('GameStateDefault');
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
     if (1) {
    // if ($_POST['GameState'] == 'EndGame') {
         //$gamebankout[$key]["GameWinner"] = $gamebrdout[$tokenmap[$gamebankout[$key]["TeamAScore"]][$gamebankout[$key]["TeamBScore"]]]['idOwner'];
         $thetoken = $tokenmap[$gamebankout[$key]["TeamBScore"]][$gamebankout[$key]["TeamAScore"]];
         $gamebankout[$key]["GameWinner"] = $gamebrdout[$thetoken]['idOwner'];
     }
     $gamebankout[$key]["message"]   = (isset($_POST['message']))    ? ($_POST['message']  )   : ('messageDefault');
     $out = $gamebankout[$key];
    //-- Store the new games list
    $fp = fopen($gamesbankbasename, 'w+') or die("I could not open $gamesbankbasename.");
    fwrite($fp, serialize($gamebankout));
    fclose($fp); 

// echo '[';
echo json_encode($out);
// echo ']';
?>
