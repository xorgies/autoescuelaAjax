<?php
/**
 * Created by PhpStorm.
 * User: Sergio Lopez Castaño
 * Date: 08/03/2016
 * Time: 0:10
 */

// Va a devolver una respuesta JSON que no se debe cachear
header("Content-Type: text/xml");
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "autoescuela";
$usuario   = "root";
$password  = "";

$tipo=$_REQUEST['tipo'];


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$respuesta="<?xml version='1.0' encoding='UTF-8'?><clases>";
if($tipo=="teorica"){
    $sql = "select * from clase_teorica";

    $resultados = mysql_query($sql, $conexion) or die(mysql_error());


    while($fila=mysql_fetch_assoc($resultados)){
        $respuesta.="<clase>";
        $respuesta.="<cod_claset>".$fila['cod_claset']."</cod_claset>";
        $respuesta.="<duracion>".$fila['duracion']."</duracion>";
        $respuesta.="<fecha>".$fila['fecha']."</fecha>";
        $respuesta.="<hora>".$fila['hora']."</hora>";
        $respuesta.="<aforo>".$fila['aforo']."</aforo>";
        $respuesta.="<dni_prof>".$fila['dni_prof']."</dni_prof>";
        $respuesta.="</clase>";
    }


}else {
    $sql = "select * from clase_practica";

    $resultados = mysql_query($sql, $conexion) or die(mysql_error());

    while($fila=mysql_fetch_assoc($resultados)){
        $respuesta.="<clase>";
        $respuesta.="<id_clasep>".$fila['id_clasep']."</id_clasep>";
        $respuesta.="<duracion>".$fila['duracion']."</duracion>";
        $respuesta.="<fecha>".$fila['fecha']."</fecha>";
        $respuesta.="<hora>".$fila['hora']."</hora>";
        $respuesta.="<tarifa_horaria>".$fila['tarifa_horaria']."</tarifa_horaria>";
        $respuesta.="<dni_profesor>".$fila['dni_profesor']."</dni_profesor>";
        $respuesta.="<dni_cliente>".$fila['dni_cliente']."</dni_cliente>";
        $respuesta.="</clase>";
    }


}

$respuesta.="</clases>";
echo $respuesta;

mysql_close($conexion);

?>