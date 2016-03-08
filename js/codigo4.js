/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$(function() {
    //menu
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

    //dialogo listados
    $("#listados").dialog({
        autoOpen: false,
        close: function () {
            $("#listado").remove();
        },
        closeOnEscape: false, // No se cierra con ESCAPE
        hide:"fold",
        show: "fold",
        height:"auto",
        width:"auto",
        resizable:true,
        buttons: [{
            text: "Aceptar",
            click: function(){
                $(this).dialog("close");
            }
        }]
    });

    cargarTiposVehiculo();

    //Menu Alta Profesor
    $("#menuAltaProfesor").click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('#frmProfesoresAlta').size() == 0 ){
            $('<div id="divFrmAltaProfesor" title="Alta profesor">').appendTo('#formularios').load("html/frmAltaProfesor.html",function(){$.getScript("js/altaProfesor.js") });
        } else {
            // Lo muestro si está oculto
            $('#divFrmAltaProfesor').dialog("open");
        }
    });

    //Menu Modificacion Profesor
    $("#menuModProfesor").click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('#frmProfesoresElegir').size() == 0 ){
            $('<div id="divFrmModProfesorElegir" title="Modifica profesor">').appendTo('#formularios').load("html/frmModProfesorElegir.html",function(){$.getScript("js/modProfesor.js") });
        } else {
            // Lo muestro si está oculto
            $('#divFrmModProfesorElegir').dialog("open");
        }

    });

    //Menu Listado Profesor
    $("#menuListadoProfesor").click(function(){
        $("#listado").remove();
        $.get('php/getProfesores.php',null,cargarListadoProfesores,'json');
    });

    function cargarListadoProfesores(oArrayProfesores, sStatus, oXHR){
        $("#sltModificarPro").empty();
        var jqTabla = $('<table id="listado" border="1">');
        $('<tr><th>DNI</th><th>Nombre</th><th>Apellidos</th><th>Email</th><th>Direccion</th><th>Telefono</th></tr>').appendTo(jqTabla);

        $(oArrayProfesores).each(function(){
            $('<tr>' +
                '<td>'+this.dni+'</td>' +
                '<td>'+this.nombre+'</td>' +
                '<td>'+this.apellidos+'</td>' +
                '<td>'+this.email+'</td>' +
                '<td>'+this.direccion+'</td>' +
                '<td>'+this.telefono+'</td>' +
                '</tr>').appendTo(jqTabla);
        });
        jqTabla.appendTo("#listados");
        $('#listados').dialog('open');
    }

    //Menu Alta Cliente
    $("#menuAltaCliente").click(function(){
// Verifico si ya he cargado el formulario antes
        if( $('#frmClientesAlta').size() == 0 ){
            $('<div id="divFrmAltaCliente" title="Alta cliente">').appendTo('#formularios').load("html/frmAltaCliente.html",function(){$.getScript("js/altaCliente.js") });
        } else {
            // Lo muestro si está oculto
            $('#divFrmAltaCliente').dialog("open");
        }
    });

    //Menu Modificacion Cliente
    $("#menuModCliente").click(function(){
            // Verifico si ya he cargado el formulario antes
            if( $('#frmClientesElegir').size() == 0 ){
                $('<div id="divFrmModClienteElegir" title="Modifica cliente">').appendTo('#formularios').load("html/frmModClienteElegir.html",function(){$.getScript("js/modCliente.js") });
            } else {
                // Lo muestro si está oculto
                $('#divFrmModClienteElegir').dialog("open");
            }

    });

    //Menu Listado Cliente
    $("#menuListadoCliente").click(function(){
        $("#listado").remove();
        $.get('php/getClientes.php',null,cargarListadoClientes,'json');
    });
    function cargarListadoClientes(oArrayProfesores, sStatus, oXHR){
        $("#sltModificarPro").empty();
        var jqTabla = $('<table id="listado" border="1">');
        $('<tr><th>DNI</th><th>Nombre</th><th>Apellidos</th><th>Email</th><th>Direccion</th><th>Telefono</th></tr>').appendTo(jqTabla);

        $(oArrayProfesores).each(function(){
            $('<tr>' +
                '<td>'+this.dni+'</td>' +
                '<td>'+this.nombre+'</td>' +
                '<td>'+this.apellidos+'</td>' +
                '<td>'+this.email+'</td>' +
                '<td>'+this.direccion+'</td>' +
                '<td>'+this.telefono+'</td>' +
                '</tr>').appendTo(jqTabla);
        });
        jqTabla.appendTo("#listados");
        $('#listados').dialog('open');
    }

    //Menu Alta Vehiculo
    $("#menuAltaVehiculo").click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('#frmVehiculosAlta').size() == 0 ){

            $('<div title="Alta veh&iacute;culo" id="divFrmAltaVehiculo"></div>').appendTo('#formularios').load("html/altaVehiculo.html", function(){ $.getScript("js/altaVehiculo.js")});

        } else {
            // Lo abro si está cerrado
            $('#divFrmAltaVehiculo').dialog("open");
        }
    });

    //Menu Modificacion Vehiculo
    $("#menuModVehiculo").click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('#frmVehiculosModificarElegir').size() == 0 ){

            $('<div title="Modificar veh&iacute;culo" id="divFrmModVehiculoElegir"></div>').appendTo('#formularios').load("html/modVehiculoElegir.html", function(){ $.getScript("js/modVehiculo.js")});

        } else {
            // Lo abro si está cerrado
            $('#divFrmModVehiculoElegir').dialog("open");
        }
    });

    //Menu Listado Vehiculo
    $("#menuListadoVehiculo").click(function(){
        // Verifico si ya he cargado el formulario antes
        if( $('#frmVehiculoListado').size() == 0 ){

            $('<div title="Listado de veh&iacute;culos" id="divFrmListadoVehiculo"></div>').appendTo('#formularios').load("html/listadoVehiculo.html", function(){ $.getScript("js/listadoVehiculo.js")});

        } else {
            // Lo abro si está cerrado
            $('#divFrmListadoVehiculo').dialog("open");
        }
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

function cargarTiposVehiculo(){
    $.get('php/getTiposVehiculos.php',null,tratarTiposVehiculos,'json');
}
function tratarTiposVehiculos(oArrayTiposVehiculos, sStatus, oXHR){
    // Guardar en localStorage
    localStorage["tiposVehiculos"] = JSON.stringify(oArrayTiposVehiculos);
}
function comprobarFloat(sNumero){
    var bNumero=false;
    var fNumero=parseFloat(sNumero);

    if(!isNaN(fNumero)){
        bNumero=true;
    }

    return bNumero;
}


