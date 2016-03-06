/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$(function() {
    var oOpcionesMenu = $("#menu>li>ul>li");

    $("#menu").menu();

    //dialogo mensaje
    $("#divMensajes").dialog({
        autoOpen:false,
        modal:true,
        buttons: [{
            text: "Aceptar",
            click: function() {
                $(this).dialog("close");
            }
        }]
    });

    //Menu Alta Profesor
    $("#menuAltaProfesor").click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('[name=frmProfesoresAlta]').size() == 0 ){

            $('<div title="Alta profesor" id="divFrmAltaProfesor"></div>').appendTo('#formularios').load("html/frmAltaProfesor.html", function(){ $.getScript("js/altaProfesor.js")});

        } else {
            // Lo abro si está cerrado
            $('#divFrmAltaProfesor').dialog("open");
        }
    });
    //Menu Modificacion Profesor
    $("#menuModProfesor").click(function(){

    });
    //Menu Listado Profesor
    $("#menuListadoProfesor").click(function(){

    });

    //Menu Alta Cliente
    $("#menuAltaCliente").click(function(){

    });
    //Menu Modificacion Cliente
    $("#menuModCliente").click(function(){

    });
    //Menu Listado Cliente
    $("#menuListadoCliente").click(function(){

    });

    //Menu Alta Vehiculo
    $("#menuAltaVehiculo").click(function(){

    });
    //Menu Modificacion Vehiculo
    $("#menuModVehiculo").click(function(){

    });
    //Menu Listado Vehiculo
    $("#menuListadoVehiculo").click(function(){

    });

    //Menu Alta Clase Teorica
    $("#menuAltaClaseTeorica").click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('#frmClaseTeoricaAlta').size() == 0 ){

            $('<div title="Alta clase teorica" id="divFrmAltaClaseTeorica"></div>').appendTo('#formularios').load("html/altaClaseTeorica.html", function(){ $.getScript("js/altaClaseTeorica.js")});

        } else {
            // Lo abro si está cerrado
            $('#divFrmAltaClaseTeorica').dialog("open");
        }
    });
    //Menu Alta Clase Practica
    $("#menuAltaClasePractica").click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('#frmClasePracticaAlta').size() == 0 ){

            $('<div title="Alta clase practica" id="divFrmAltaClasePractica"></div>').appendTo('#formularios').load("html/altaClasePractica.html", function(){ $.getScript("js/altaClasePractica.js")});

        } else {
            // Lo abro si está cerrado
            $('#divFrmAltaClasePractica').dialog("open");
        }
    });
    //Menu Listado Clase
    $("#menuListadoClase").click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('#frmListadoClase').size() == 0 ){

            $('<div title="Listado de clases" id="divFrmListadoClases"></div>').appendTo('#formularios').load("html/listadoClases.html", function(){ $.getScript("js/listadoClases.js")});

        } else {
            // Lo abro si está cerrado
            $('#divFrmListadoClases').dialog("open");
        }
    });

});