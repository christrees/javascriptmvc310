<?php
// Initialize the session.
// If you are using session_name("something"), don't forget it now!
session_start();
setcookie ("idGameBrd", "", time() - 3600, "/spools/spoolsapps");
setcookie ("idPlayer", "", time() - 3600, "/spools/spoolsapps");
setcookie ("idGameBrd", "", time() - 3600, "/spools");
setcookie ("idPlayer", "", time() - 3600, "/spools");
setcookie ("idGameBrd", "", time() - 3600, "/");
setcookie ("idPlayer", "", time() - 3600, "/");
setcookie ("idGameBrd", "", time() - 3600, "");
setcookie ("idPlayer", "", time() - 3600, "");
//-EXPIRE COOKIE- set time in past so browser deletes.
//setcookie ("idPlayer", "", time() - 3600, "/");
//setcookie ("idGameBrd", "", time() - 3600, "/");
//setcookie ("spoolsgameboard1", "", time() - 3600);


// If it's desired to kill the session, also delete the session cookie.
// Note: This will destroy the session, and not just the session data!
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Finally, destroy the session.
// Unset all of the session variables.
session_unset();
session_destroy();
$_SESSION = array();
session_start();
setcookie ("idGameBrd", "", time() - 3600, "/spools/spoolsapps");
setcookie ("idPlayer", "", time() - 3600, "/spools/spoolsapps");
setcookie ("idGameBrd", "", time() - 3600, "/spools");
setcookie ("idPlayer", "", time() - 3600, "/spools");
setcookie ("idGameBrd", "", time() - 3600, "/");
setcookie ("idPlayer", "", time() - 3600, "/");
setcookie ("idGameBrd", "", time() - 3600, "");
setcookie ("idPlayer", "", time() - 3600, "");
//http://hu.php.net/manual/en/function.session-destroy.php
// set the cookies
/*
setcookie("cookie[three]", "cookiethree");
setcookie("cookie[two]", "cookietwo");
setcookie("cookie[one]", "cookieone");
*/
// after the page reloads, print them out
/*
if (isset($_COOKIE['cookie'])) {
    foreach ($_COOKIE['cookie'] as $name => $value) {
        $name = htmlspecialchars($name);
        $value = htmlspecialchars($value);
        echo "$name : $value <br />\n";
    }
}
 *
 * http://www.php.net/manual/en/function.setcookie.php
 * function SetCookieLive($name, $value='', $expire = 0, $path = '', $domain='', $secure=false, $httponly=false)
    {
        $_COOKIE[$name] = $value;
        return setcookie($name, $value, $expire, $path, $domain, $secure, $httponly);
    }

    function RemoveCookieLive($name)
    {
        unset($_COOKIE[$name]);
        return setcookie($name, NULL, -1);
    }
 */
if (isset($_POST['nukedata'])) { //-- Do we want to nuke the files
    if ($_POST['nukedata'] == 'nukefile') { //-- Yup... go delete stuff
       $mask = "spoolsdata/*.spools";
       array_map( "unlink", glob( $mask ) );
    }
}
echo '<a href="/spools/spools.html">Re-Spool Me<a>';
echo '<br/>Nuke the data files:<br/>';
echo '<form action="/spools/spoolspps/nukecookieandsession.php" method="post">';
echo 'Type nukefiles to nuke files in spools\spoolspps\spoolsdata\*:<br/> <input type="text" name="nukedata" value="nukefile" />';
echo 'Age: <input type="text" name="age" value="999"/>';
echo '<br/><input type="submit" />';
echo '</form>';
?>
