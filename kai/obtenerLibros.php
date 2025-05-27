<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

error_reporting(0);
mysqli_report(MYSQLI_REPORT_OFF);

$conexion = mysqli_connect("localhost", "root", "", "kai");

if (!$conexion) {
    echo json_encode(["mensaje" => "Error de conexión a la base de datos"]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT * FROM libros";
    $resultados = mysqli_query($conexion, $sql);

    $datos = [];
    while ($fila = mysqli_fetch_array($resultados, MYSQLI_ASSOC)) {
        $datos[] = $fila;
    }

    $response = ["mensaje" => !empty($datos) ? "ok" : "No hay libros disponibles", "datos" => $datos];

    echo json_encode($response);
} else {
    echo json_encode(["mensaje" => "Método no permitido"]);
}

mysqli_close($conexion);
?>
