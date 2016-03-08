<?php
/**
 * Created by PhpStorm.
 * User: iterrero
 * Date: 8/03/16
 * Time: 14:41
 */

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


$sql = "insert into cliente (nombre,apellidos,dni,direccion,telefono,email,cod_claset)
values ('".$oCliente->nombre."','".$oCliente->apellidos."','".$oCliente->dni."','".$oCliente->direccion."','".$oCliente->telefono."','".$oCliente->email."','".$oCliente->clase."')";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='Alta de cliente realizada';
$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>