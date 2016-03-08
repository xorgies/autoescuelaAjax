<?php
/**
 * Created by PhpStorm.
 * User: Sergio Lopez Castaño
 * Date: 08/03/2016
 * Time: 0:49
 */

// Va a devolver una respuesta JSON que no se debe cachear
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "autoescuela";
$usuario   = "root";
$password  = "";

$datos=$_REQUEST['clase'];

$oClase = json_decode($datos);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "insert into clase_practica (duracion,fecha,hora,tarifa_horaria,dni_profesor,dni_cliente)
values (".$oClase->duracion.",'".$oClase->fecha."','".$oClase->hora."',".$oClase->tarifa.",'".$oClase->dniProf."','".$oClase->dniCli."')";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='Alta de clase practica realizada';
$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>