<?php
include_once 'common.php';
//--OK we should have a $gamebankout array
//--Send the games model to the user
reset($gamebankout);
echo '[';
while (current($gamebankout)) {
    echo json_encode(current($gamebankout));
    if (next($gamebankout)) echo ',';
}
//echo json_encode($gamebankout);
echo ']';
?>