<?php
define("HOSTNAME", "localhost");
define("USERNAME", "root");
define("PASSWORD", "root");
define("DATABASE", "valores");//utf8mb4_spanish_ci

// Obtener los datos enviados por POST
$json_data = file_get_contents('php://input');

// Decodificar los datos JSON en un array de objetos
$data = json_decode($json_data);
$db = new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE);
// Recorrer los objetos e insertarlos en la base de datos
foreach ($data as $obj) {
  $country = $obj->country;
  $population1970 = $obj->population1970;
  $population2022 = $obj->population2022;
  $area = $obj->area;
  

  // Ejecutar la consulta de inserción en la base de datos
  $query = "INSERT INTO tabla_datos (country, population1970, population2022, area) VALUES ('$country', $population1970, $population2022, $area)";
  $db->query($query);
}
mysqli_close($db);
