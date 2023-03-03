<?php
define("HOSTNAME", "localhost");
define("USERNAME", "root");
define("PASSWORD", "root");
define("DATABASE", "datos"); ////utf8mb4_spanish_ci
$db = new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE);
$query ="DELETE FROM tabla_datos";
$db->query($query);
mysqli_close($db);