<?php
define("HOSTNAME", "localhost");
define("USERNAME", "root");
define("PASSWORD", "root");
define("DATABASE", "datos");//utf8mb4_spanish_ci 

// Parámetros para la paginación
$perPage = 10;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;

// Cálculo de los registros que se deben mostrar
$start = ($page - 1) * $perPage;
$end = $start + $perPage;

$conexion = new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE);
if ($conexion->connect_error) {
    die("Error al conectar a la base de datos: " . $conn->connect_error);
  }

$query ="SELECT  `country`, `population1970`, `population2022`, `area` FROM `tabla_datos` LIMIT $start, $perPage";
$result=mysqli_query($conexion,$query) or die(mysqli_error($conexion));

// Si se encontraron resultados
if ($result->num_rows > 0) {
  $data = array();

  // Recorrer los resultados y guardarlos en un array
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }

  // Enviar los resultados como JSON
  header('Content-Type: application/json');
  echo json_encode($data);
} else {
  echo "0 results";
}

mysqli_close($conexion);