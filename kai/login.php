<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

error_reporting(0);
mysqli_report(MYSQLI_REPORT_OFF);

$conexion = mysqli_connect("localhost", "root", "", "kai");

if (!$conexion) {
    echo json_encode(["mensaje" => "Error de conexión a la base de datos"]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $identifier = $_POST["identifier"] ?? '';
    $password = $_POST["password"] ?? '';

    if (empty($identifier) || empty($password)) {
        echo json_encode(["mensaje" => "Faltan datos"]);
        exit();
    }

    $stmt = $conexion->prepare("SELECT id, nombre, email FROM usuarios WHERE (nombre = ? OR email = ?) AND contraseña = ?");
    $stmt->bind_param("sss", $identifier, $identifier, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $datos = $result->fetch_assoc(); 

    class Result {}
    $response = new Result();

    if ($datos) {
        $response->mensaje = 'ok';
        $response->datos = $datos;
    } else {
        $response->mensaje = 'Usuario o contraseña incorrectos';
    }

    echo json_encode($response);
    
    $stmt->close();
    $conexion->close();
} else {
    echo json_encode(["mensaje" => "Método no permitido"]);
}
?>
