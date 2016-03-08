/**
 * Created by iterrero on 24/02/16.
 */

//esto carga el alta de profesor
$('.dropdown ul li')[0].click(function(){

    // Oculto todos los formularios menos este
    $("div.dialogo:not('#altaProfesor')").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if( $('#altaProfesor').size() == 0 ){
        $('<div class="col-sm-6 col-sm-offset-3 dialogo" id="altaProfesor" title="Alta profesor">').appendTo('#formularios').load("html/frmAltaProfesor.html",function(){$.getScript("js/altaProfesor.js") });
    } else {
        // Lo muestro si está oculto
        $('altaProfesor').show("normal");
    }

});
//esto carga el mod profesor
$('.dropdown ul li')[1].click(function(){

    // Oculto todos los formularios menos este
    $("div.dialogo:not('#modificarProfesor')").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if( $('#modificarProfesor').size() == 0 ){
        $('<div class="col-sm-6 col-sm-offset-3 dialogo" id="modificarProfesor" title="Modifica profesor">').appendTo('#formularios').load("html/frmModProfesor.html",function(){$.getScript("js/modProfesor.js") });
    } else {
        // Lo muestro si está oculto
        $('#modificarProfesor').show("normal");
    }

});

//esto carga el alta de cliente
$('.dropdown ul li')[3].click(function(){

    // Oculto todos los formularios menos este
    $("div.dialogo:not('#altaCliente')").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if( $('#altaCliente').size() == 0 ){
        $('<div class="col-sm-6 col-sm-offset-3 dialogo" id="altaCliente" title="Alta cliente">').appendTo('#formularios').load("html/frmAltaCliente.html",function(){$.getScript("js/altaCliente.js") });
    } else {
        // Lo muestro si está oculto
        $('#altaCliente').show("normal");
    }

});
//esto carga el mod cliente
$('.dropdown ul li')[4].click(function(){

    // Oculto todos los formularios menos este
    $("div.dialogo:not('#modificarCliente')").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if( $('#modificarCliente').size() == 0 ){
        $('<div class="col-sm-6 col-sm-offset-3 dialogo" id="modificarCliente" title="Modifica Cliente">').appendTo('#formularios').load("html/frmModCliente.html",function(){$.getScript("js/modCliente.js") });
    } else {
        // Lo muestro si está oculto
        $('#modificarCliente').show("normal");
    }

});


function cargarSelectsClaTeorica(){
    $.get('php/getClaseTeorica.php',null,procesarClaTeorica,'json');
}
function procesarClaTeorica(oArrayClases, sStatus, oXHR){
    $("#sltAltaCli").empty();

    $(oArrayClases).each(function(){
        $('<option>').val(this.cod_claset).text(this.fecha+" "+this.hora).appendTo("#sltAltaCli");
    });
}
