<?php
/**
 * Created by PhpStorm.
 * User: Isa
 * Date: 8/03/16
 * Time: 19:26
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

$oCliente = json_decode($datos);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "update cliente set nombre='".$oCliente->nombre."',apellidos='".$oCliente->apellidos."',direccion='".$oCliente->direccion."',telefono='".$oCliente->telefono."',email='".$oCliente->email."',cod_claset='".$oCliente->clase."' where dni='".$oCliente->dni."'";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='Modificacion de cliente realizada';
$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>