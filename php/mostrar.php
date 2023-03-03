<?php
define("HOSTNAME", "localhost");
define("USERNAME", "root");
define("PASSWORD", "root");
define("DATABASE", "valores");//utf8mb4_spanish_ci

$conexion = new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE);
if ($conexion->connect_error) {
    die("Error al conectar a la base de datos: " . $conn->connect_error);
  }

$query ="SELECT  `country`, `population1970`, `population2022`, `area` FROM `tabla_datos`";
$result=mysqli_query($conexion,$query) or die(mysqli_error($conexion));

$datos = [];
while ($row = mysqli_fetch_array($result)) {
    array_push($datos, $row);
}
echo json_encode($datos);
mysqli_close($conexion);