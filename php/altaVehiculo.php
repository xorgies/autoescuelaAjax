<?php
/**
 * Created by PhpStorm.
 * User: Sergio Lopez Castaño
 * Date: 08/03/2016
 * Time: 1:14
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

$oVehiculo = json_decode($datos);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "insert into vehiculo (matricula,marca,modelo,tipo,dni_prof)
values ('".$oVehiculo->matricula."','".$oVehiculo->marca."','".$oVehiculo->modelo."','".$oVehiculo->tipo."','".$oVehiculo->dniProf."')";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='Alta de vehiculo realizada';
$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>