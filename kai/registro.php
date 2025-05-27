<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

$conexion = mysqli_connect("localhost", "root", "", "kai");

if (mysqli_connect_errno()) {
    $response['message'] = "Error de conexión a la base de datos";
} else {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nombre = mysqli_real_escape_string($conexion, $_POST['nombre']);
        $email = mysqli_real_escape_string($conexion, $_POST['email']);
        $contraseña = mysqli_real_escape_string($conexion,$_POST['contraseña'],);

        $sql = "INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($conexion, $sql);
        mysqli_stmt_bind_param($stmt, "sss", $nombre, $email, $contraseña);

        if (mysqli_stmt_execute($stmt)) {
            $response['success'] = true;
            $response['message'] = "Registro exitoso";
        } else {
            $response['message'] = "Error al registrar: " . mysqli_error($conexion);
        }

        mysqli_stmt_close($stmt);
    } else {
        $response['message'] = "Método no permitido";
    }
    mysqli_close($conexion);
}

echo json_encode($response);


// class Result {}
// $response = new Result();
// if ($datos != null) {
//   $response->mensaje = 'ok';
//   $response->datos = $datos;
// } else {
//   $response->mensaje = '¡Error, lectura de datos!';
// }
// header('Content-Type: application/json');
// echo json_encode($response);
// ?>