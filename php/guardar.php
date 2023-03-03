<?php

define("HOSTNAME", "localhost");
define("USERNAME", "root");
define("PASSWORD", "root");
define("DATABASE", "valores"); 
  // Recuperamos los datos enviados por la llamada AJAX
  $datos = $_POST['datos'];
/*  $conexion = mysqli_connect(HOSTNAME, USERNAME, PASSWORD, DATABASE);
  if (!$conexion) {
    die('Error de conexión: ' . mysqli_connect_error());
  }

  // Creamos la consulta SQL para insertar los datos en la base de datos
  $consulta = "INSERT INTO tabla_datos (country, population1970, population2020,area) VALUES ";
  foreach ($datos as $dato) {
    $consulta .= "('{$dato['country']}', '{$dato['population1970']}', '{$dato['population2022']},'{$dato['area']}'),";
  }
  $consulta = rtrim($consulta, ',');

  // Ejecutamos la consulta SQL
  if (mysqli_query($conexion, $consulta)) {
    echo "Los datos se han guardado correctamente";
  } else {
    echo "Error al guardar los datos: " . mysqli_error($conexion);
  }

  // Cerramos la conexión a la base de datos
  mysqli_close($conexion);
*/
?>