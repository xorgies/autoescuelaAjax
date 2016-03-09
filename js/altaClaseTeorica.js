/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$("#divFrmAltaClaseTeorica").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:cargarSelectsClaTeo,
    close: function () {
        $("#frmClaseTeoricaAlta")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: procesoAltaClaseTeorica
    }]
});

var dias = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

$('#txtFechaAltaClaTeorica').datepicker({
    monthNamesShort: meses,
    dayNamesMin: dias,
    changeYear: true,
    changeMonth: true
});

function cargarSelectsClaTeo(){
    $.get('php/getProfesores.php',null,tratarCargarProfesoresClaTeo,'json');
}
function tratarCargarProfesoresClaTeo(oArrayProfesores, sStatus, oXHR){
    $("#sltProfAltaClaTeorica").empty();

    $(oArrayProfesores).each(function(){
        $('<option>').val(this.dni).text(this.nombre+" "+this.apellidos).appendTo("#sltProfAltaClaTeorica");
    });

}

function procesoAltaClaseTeorica(){

    if(validarAltaClaseTeorica()){
        var iDuracion=parseInt($("#txtDuracionAltaClaTeorica").val());
        var dtFecha=new Date($("#txtFechaAltaClaTeorica").val());
        var sHora=$("#txtHoraAltaClaTeorica").val();
        var iAforo=parseInt($("#txtAforoAltaClaTeorica").val());
        var sDniProf=$("#sltProfAltaClaTeorica").val();

        var oClase={
            duracion:iDuracion,
            fecha:dtFecha,
            hora:sHora,
            aforo:iAforo,
            dniProf:sDniProf
        };

        var jClase=JSON.stringify(oClase);

        $.ajax({ url : "php/altaClaseTeorica.php",
            data:{datos:jClase},
            async: true, // Valor por defecto
            dataType :'json',
            method: "POST",
            cache: false, // ya por defecto es false para POST
            success: tratarRespuestaAltaClaseTeorica,
            error :tratarErrorAltaClaseTeorica
        });


    }
}


function tratarRespuestaAltaClaseTeorica(oArrayRespuesta,sStatus,oXHR){
    $("#divMensajes").dialog("open");

    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divFrmAltaClaseTeorica').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }

}

function tratarErrorAltaClaseTeorica(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);

}

function validarAltaClaseTeorica(){

    var bValido=true;
    var sError="";
    //limpia errores
    $('input,select').removeClass("error");

    //campo duracion
    var sDuracion=$("#txtDuracionAltaClaTeorica").val().trim();
    $("#txtDuracionAltaClaTeorica").val(sDuracion);

    if (sDuracion=="" || !comprobarFloat(sDuracion)) {
        bValido = false;
        sError += "La duracion no es valida<br>";
        $("#txtDuracionAltaClaTeorica").addClass("error");
    }

    //Campo fecha
    var sfecha = $("#txtFechaAltaClaTeorica").val().trim();

    if(sfecha=="") {
        bValido = false;
        sError += "El campo de fecha esta vacia<br>";
        $("#txtFechaAltaClaTeorica").addClass("error");
    }


    //Campo hora
    var sHora = $("#txtHoraAltaClaTeorica").val().trim();
    //Campo corregido con trim
    $("#txtHoraAltaClaTeorica").val(sHora);

    var oExpReg2 = /^(((0|1)[0-9])|2[0-3]):[0-5][0-9]$/;

    if(sHora=="" || oExpReg2.test(sHora) == false) {
        bValido = false;
        sError += "La hora no es valida<br>";
        $("#txtHoraAltaClaTeorica").addClass("error");
    }

    //Campo Aforo
    var sAforo = $("#txtAforoAltaClaTeorica").val().trim();
    //Campo corregido con trim
    $("#txtAforoAltaClaTeorica").val(sAforo);

    var oExpReg3 = /^\d{1,3}$/;

    if(sAforo=="" || !oExpReg3.test(sAforo)){
        bValido = false;
        sError += "La tarifa no es valida";
        $("#txtAforoAltaClaTeorica").addClass("error");
    }

    if(!bValido){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error validacion");
        $("#pMensaje").html(sError);
    }

    return bValido;

}

