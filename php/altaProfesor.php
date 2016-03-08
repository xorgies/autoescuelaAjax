<?php
/**
 * Created by PhpStorm.
 * User: iterrero
 * Date: 8/03/16
 * Time: 12:52
 */

// Va a devolver una respuesta JSON que no se debe cachear
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "autoescuela";
$usuario   = "root";
$password  = "";

$datos=$_REQUEST['datos'];

$oProfesor = json_decode($datos);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "insert into profesor (nombre,apellidos,dni,direccion,telefono,email)
values ('".$oProfesor->nombre."','".$oProfesor->apellidos."','".$oProfesor->dni."','".$oProfesor->direccion."','".$oProfesor->telefono."','".$oProfesor->email."')";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='Alta de profesor realizada';
$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>