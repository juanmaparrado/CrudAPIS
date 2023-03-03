<?php
define("HOSTNAME", "localhost");
define("USERNAME", "root");
define("PASSWORD", "root");
define("DATABASE", "datos");//utf8mb4_spanish_ci 

$conexion = new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE);
if ($conexion->connect_error) {
    die("Error al conectar a la base de datos: " . $conexion->connect_error);
  }
  // Ejecutar la consulta SQL para obtener los datos paginados
  $sql = "SELECT `country`, `population1970`, `population2022`, `area` FROM tabla_datos LIMIT 10 ";
  $result = mysqli_query($conexion,$sql);
  
  // Convertir los resultados de la consulta a un array asociativo
  $datos = [];
  while ($row = mysqli_fetch_array($result)) {
    array_push($datos, $row);
}
echo json_encode($datos);
  
mysqli_close($conexion);