<?php
include_once 'common.php';
//--OK we should have a $gamebankout array
//--User just sent us an update
//-- OK if the user attemps to post a board, we need see if it exist
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
//--Figure out the post data
if (isset($_POST['idGameBrd'])) {
    /* this is in common
    $idGameBrd_post = $_POST['idGameBrd'];
    $TeamNameA_post = $_POST['TeamNameA'];
    $TeamNameB_post = $_POST['TeamNameB'];
    $message_post   = $_POST['message'];
     * 
     */
//    $needle = array("idGameBrd" => $idGameBrd_post);
//    $haystack = $gamebankout;
//    $key = findGameBrd($needle, $haystack);
//    if ($key) {
    if (isset($_POST['id'])) {
     $key = $_POST['id'];
     $gamebankout[$key]["idGameBrd"] = $idGameBrd_post;
     $gamebankout[$key]["TeamNameA"] = $TeamNameA_post;
     $gamebankout[$key]["TeamNameB"] = $TeamNameB_post;
     $gamebankout[$key]["TypeSport"] = $TypeSport_post;
     $gamebankout[$key]["TeamAScore"] = $TeamAScore_post;
     $gamebankout[$key]["TeamBScore"] = $TeamBScore_post;
     $gamebankout[$key]["message"]   = $message_post;
     $out = $gamebankout[$key];
    } else {
     $newGame = $theGame["gamesbankinit"];
     $newGame["idGameBrd"] = $idGameBrd_post;
     $newGame["TeamNameA"] = $TeamNameA_post;
     $newGame["TeamNameB"] = $TeamNameB_post;
     $newGame["TypeSport"] = $TypeSport_post;
     $newGame["TeamAScore"] = $TeamAScore_post;
     $newGame["TeamBScore"] = $TeamBScore_post;
     $newGame["message"]   = $message_post;
     $newGame["id"] = count($gamebankout) + 1;
     array_push($gamebankout, $newGame);
     end($gamebankout);
     $out = current($gamebankout);
    }
    //-- Store the new games list
    $fp = fopen($gamesbankbasename, 'w+') or die("I could not open $gamesbankbasename.");
    fwrite($fp, serialize($gamebankout));
    fclose($fp); 
} else {
    $out = end($gamebankout);
}

// echo '[';
echo json_encode($out);
// echo ']';
?>
