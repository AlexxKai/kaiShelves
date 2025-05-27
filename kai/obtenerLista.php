<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$conexion = new mysqli("localhost", "root", "", "kai");

if ($conexion->connect_error) {
    die(json_encode(["mensaje" => "Error de conexión a la base de datos"]));
}

$sql = "SELECT * FROM lista";
$resultado = $conexion->query($sql);

$libros = [];

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $libros[] = $fila;
    }
    echo json_encode(["mensaje" => "ok", "datos" => $libros]);
} else {
    echo json_encode(["mensaje" => "No hay libros en la lista"]);
}

$conexion->close();
?>
