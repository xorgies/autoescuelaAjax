<?php
/**
 * Created by PhpStorm.
 * User: iterrero
 * Date: 8/03/16
 * Time: 13:50
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


$sql = "update profesor set nombre='".$oProfesor->nombre."',apellidos='".$oProfesor->apellidos."',direccion='".$oProfesor->direccion."',telefono='".$oProfesor->telefono."',email='".$oProfesor->email."' where dni='".$oProfesor->dni."'";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='Modificacion de profesor realizada';
$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>