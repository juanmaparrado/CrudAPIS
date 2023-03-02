<?php

define("HOSTNAME", "localhost");
define("USERNAME", "root");
define("PASSWORD", "");
define("DATABASE", "DATOS"); // utf8_spanish2_ci

$conexion = mysqli_connect(HOSTNAME, USERNAME, PASSWORD, DATABASE);

$valorX = $_POST['valorX'];
$valorY1 = $_POST['valorY1'];
$valorY2 = $_POST['valorY2'];
$consulta = "INSERT INTO valores (valorX, valorY1, valorY2) VALUES ('$valorX', '$valorY1', '$valorY2')";
$registros = mysqli_query($conexion, $consulta) or die(mysqli_error($conexion));

$datos = [];
echo json_encode($datos);
