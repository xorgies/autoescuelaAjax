/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$(function() {
    var oOpcionesMenu = $(".dropdown ul li");

    //Menu Alta Profesor
    oOpcionesMenu[0].click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('[name=frmProfesoresAlta]').size() == 0 ){

            $('<div title="Alta profesor" id="divFrmAltaProfesor"></div>').appendTo('#formularios').load("html/frmAltaProfesor.html", function(){ $.getScript("js/altaProfesor.js")});

        } else {
            // Lo abro si está cerrado
            $('#divFrmAltaProfesor').dialog("open");
        }
    });
    //Menu Modificacion Profesor
    oOpcionesMenu[1].click(function(){

    });
    //Menu Listado Profesor
    oOpcionesMenu[2].click(function(){

    });

    //Menu Alta Cliente
    oOpcionesMenu[3].click(function(){

    });
    //Menu Modificacion Cliente
    oOpcionesMenu[4].click(function(){

    });
    //Menu Listado Cliente
    oOpcionesMenu[5].click(function(){

    });

    //Menu Alta Vehiculo
    oOpcionesMenu[6].click(function(){

    });
    //Menu Modificacion Vehiculo
    oOpcionesMenu[7].click(function(){

    });
    //Menu Listado Vehiculo
    oOpcionesMenu[8].click(function(){

    });

    //Menu Alta Clase Teorica
    oOpcionesMenu[9].click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('[name=frmClaseTeoricaAlta]').size() == 0 ){

            $('<div title="Alta clase teorica" id="divFrmAltaClaseTeorica"></div>').appendTo('#formularios').load("html/altaClaseTeorica.html", function(){ $.getScript("js/altaClaseTeorica.js")});

        } else {
            // Lo abro si está cerrado
            $('#divFrmAltaClaseTeorica').dialog("open");
        }
    });
    //Menu Alta Clase Practica
    oOpcionesMenu[10].click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('[name=frmClasePracticaAlta]').size() == 0 ){

            $('<div title="Alta clase practica" id="divFrmAltaClasePractica"></div>').appendTo('#formularios').load("html/altaClasePractica.html", function(){ $.getScript("js/altaClasePractica.js")});

        } else {
            // Lo abro si está cerrado
            $('#divFrmAltaClasePractica').dialog("open");
        }
    });
    //Menu Listado Clase
    oOpcionesMenu[11].click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('[name=frmListadoClase]').size() == 0 ){

            $('<div title="Listado de clases" id="divFrmListadoClases"></div>').appendTo('#formularios').load("html/listadoClases.html", function(){ $.getScript("js/listadoClases.js")});

        } else {
            // Lo abro si está cerrado
            $('#divFrmListadoClases').dialog("open");
        }
    });

});