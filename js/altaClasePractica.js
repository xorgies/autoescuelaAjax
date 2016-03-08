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

function cargarProfesoresClaPra(oArrayProfesores, sStatus, oXHR){
    $("#sltProfAltaClaPractica").empty();

    $(oArrayProfesores).each(function(){
        $('<option>').val(this.dni).text(this.nombre+" "+this.apellidos).appendTo("#sltProfAltaClaPractica");
    });

}

function cargarClientesClaPra(oArrayClientes, sStatus, oXHR){
    $("#sltCliAltaClaPractica").empty();

    $(oArrayClientes).each(function(){
        $('<option>').val(this.dni).text(this.nombre+" "+this.apellidos).appendTo("#sltCliAltaClaPractica");
    });
}

function procesoAltaClasePractica(){
    if(validarAltaClasePractica()){
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

    }
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

    var bValido=true;
    var sError="";
    //limpia errores
    $('input,select').removeClass("error");

    //campo duracion
    var sDuracion=$("#txtDuracionAltaClaPractica").val().trim();
    $("#txtDuracionAltaClaPractica").val(sDuracion);

    if (sDuracion=="" || !comprobarFloat(sDuracion)) {
        bValido = false;
        sError += "La duracion no es valida<br>";
        $("#txtDuracionAltaClaPractica").addClass("error");
    }

    //Campo fecha
    var sfecha = $("#txtFechaAltaClaPractica").val().trim();

    if(sfecha=="") {
        bValido = false;
        sError += "El campo de fecha esta vacia<br>";
        $("#txtFechaAltaClaPractica").addClass("error");
    }


    //Campo hora
    var sHora = $("#txtHoraAltaClaPractica").val().trim();
    //Campo corregido con trim
    $("#txtHoraAltaClaPractica").val(sHora);

    var oExpReg2 = /^(((0|1)[0-9])|2[0-3]):[0-5][0-9]$/;

    if(sHora=="" || oExpReg2.test(sHora) == false) {
        bValido = false;
        sError += "La hora no es valida<br>";
        $("#txtHoraAltaClaPractica").addClass("error");
    }

    //Campo tarifa
    var sTarifa = $("#txtTarifaAltaClaPractica").val().trim();
    //Campo corregido con trim
    $("#txtTarifaAltaClaPractica").val(sTarifa);

    if(sTarifa=="" || !comprobarFloat(sTarifa)){
        bValido = false;
        sError += "La tarifa no es valida";
        $("#txtTarifaAltaClaPractica").addClass("error");
    }

    if(!bValido){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error validacion");
        $("#pMensaje").html(sError);
    }

    return bValido;
}