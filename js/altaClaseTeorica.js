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
    $.get('php/getProfesores.php',null,cargarProfesoresClaTeo,'json');
}

function cargarProfesoresClaTeo(){
    $("#sltProfAltaClaTeorica").empty();

    var oArrayProfesores = JSON.parse(localStorage["profesores"]);

    $(oArrayProfesores).each(function(){
        $('<option>').val(this.dni).text(this.nombre+" "+this.apellidos).appendTo("#sltProfAltaClaTeorica");
    });

}

function procesoAltaClaseTeorica(){

    //if(validarAltaClaseTeorica()){ //todo validar clase teorica
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


    //}
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

}