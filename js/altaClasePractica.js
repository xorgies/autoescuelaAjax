/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$("#divFrmAltaClasePractica").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:cargarSelectsClaPra,
    close: function () {
        $("#frmClasePracticaAlta")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: procesoAltaClasePractica
    }]
});

var dias = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

$('#txtFechaAltaClaPractica').datepicker({
    monthNamesShort: meses,
    dayNamesMin: dias,
    changeYear: true,
    changeMonth: true
});
function cargarSelectsClaPra(){
    $.get('php/getProfesores.php',null,cargarProfesoresClaPra,'json');
    $.get('php/getClientes.php',null,cargarClientesClaPra,'json');
}

function cargarProfesoresClaPra(){
    $("#sltProfAltaClaPractica").empty();

    var oArrayProfesores = JSON.parse(localStorage["profesores"]);

    $(oArrayProfesores).each(function(){
        $('<option>').val(this.dni).text(this.nombre+" "+this.apellidos).appendTo("#sltProfAltaClaPractica");
    });

}

function cargarClientesClaPra(){
    $("#sltCliAltaClaPractica").empty();

    var oArrayClientes = JSON.parse(localStorage["clientes"]);

    $(oArrayClientes).each(function(){
        $('<option>').val(this.dni).text(this.nombre+" "+this.apellidos).appendTo("#sltCliAltaClaPractica");
    });
}

function procesoAltaClasePractica(){
    //if(validarAltaClasePractica()){ //todo validar clase practica
        var iDuracion=parseInt($("#txtDuracionAltaClaPractica").val());
        var dtFecha=new Date($("#txtFechaAltaClaPractica").val());
        var sHora=$("#txtHoraAltaClaPractica").val();
        var fTarifa=parseFloat($("#txtTarifaAltaClaPractica").val());
        var sDniProf=$("#sltProfAltaClaPractica").val();
        var sDniCli=$("#sltCliAltaClaPractica").val();

        var oClase={
            duracion:iDuracion,
            fecha:dtFecha,
            hora:sHora,
            tarifa:fTarifa,
            dniProf:sDniProf,
            dniCli:sDniCli
        };


        // Formateo de parametro POST
        var sParametroPOST = "clase="+JSON.stringify(oClase);

        // Llamada POST con Jquery
        $.post("php/altaClasePractica.php",sParametroPOST,respuestaAltaClasePractica,'json');

    //}
}


function respuestaAltaClasePractica(oArrayRespuesta,sEstado,oXHR){
    $("#divMensajes").dialog("open");

    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divFrmAltaClasePractica').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }
}


function validarAltaClasePractica(){

}