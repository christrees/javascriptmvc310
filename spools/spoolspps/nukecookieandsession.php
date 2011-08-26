<?php
// Initialize the session.
// If you are using session_name("something"), don't forget it now!
session_start();
//-EXPIRE COOKIE- set time in past so browser deletes.
setcookie ("idPlayer", "", time() - 3600);
setcookie ("idGameBrd", "", time() - 3600);
setcookie ("spoolsgameboard1", "", time() - 3600);

// Unset all of the session variables.
$_SESSION = array();

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
session_destroy();
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
echo '<a href="/spools/spools.html">Re-Spool Me<a>';
?>
