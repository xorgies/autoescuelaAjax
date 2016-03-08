<?php
/**
 * Created by PhpStorm.
 * User: Sergio Lopez Castaño
 * Date: 08/03/2016
 * Time: 2:16
 */

// Va a devolver una respuesta JSON que no se debe cachear
header("Content-Type: text/xml");
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "autoescuela";
$usuario   = "root";
$password  = "";

$tipo=$_REQUEST['tipo'];//todos,moto,coche,camion


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());

if($tipo=="todos"){
    $sql = "select * from vehiculo";
}else {
    $sql = "select * from vehiculo where tipo='".$tipo."'";
}

$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$respuesta="<?xml version='1.0' encoding='UTF-8'?><vehiculos>";

while($fila=mysql_fetch_assoc($resultados)){
        $respuesta.="<vehiculo>";
        $respuesta.="<matricula>".$fila['matricula']."</matricula>";
        $respuesta.="<marca>".$fila['marca']."</marca>";
        $respuesta.="<modelo>".$fila['modelo']."</modelo>";
        $respuesta.="<tipo>".$fila['tipo']."</tipo>";
        $respuesta.="<dni_prof>".$fila['dni_prof']."</dni_prof>";
        $respuesta.="</vehiculo>";
}


$respuesta.="</vehiculos>";
echo $respuesta;

mysql_close($conexion);

?>