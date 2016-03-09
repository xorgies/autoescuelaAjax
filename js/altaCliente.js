/**
 * Created by iterrero on 8/03/16.
 */

$("#divFrmAltaCliente").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:cargaClasesTeoricas,
    close: function () {
        $("#frmClientesAlta")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: procesoAltaCliente
    }]
});



function procesoAltaCliente(){
    if(validarAltaCliente()){
        sNombre=$('[name=txtNombreAltaCli]').val().trim();
        sApellido=$('[name=txtApellidosAltaCli]').val().trim();
        sDni=$('[name=txtDniAltaCli]').val().trim();
        sEmail=$('[name=txtEmailAltaCli]').val().trim();
        sDireccion=$('[name=txtDireccionAltaCli]').val().trim();
        iTelefono=$('[name=txtTelefonoAltaCli]').val().trim();
        iClase=$('#slAltaCli').val().trim();

        var oCliente={
            nombre:sNombre,
            apellidos:sApellido,
            dni:sDni,
            email:sEmail,
            direccion:sDireccion,
            telefono:iTelefono,
            clase:iClase

        };

        var jProfesor=JSON.stringify(oCliente);

        $.ajax({ url : "php/altaCliente.php",
            data:{datos:jProfesor},
            async: true,
            dataType :'json',
            method: "POST",
            cache: false,
            success: tratarRespuestaCliente,
            error :tratarErrorAltaCliente
        });
    }
}

function validarAltaCliente(){
    var bValido=true;
    var sError="";
    //limpia errores
    $('input,select').removeClass("error");

    var oExpReg = /^[\w\s]{3,20}$/;

    if(oExpReg.test($('[name=txtNombreAltaCli]').val().trim()) == false){

        bValido = false;
        sError += "El nombre no es valido<br>";
        $('[name=txtNombreAltaCli]').addClass("error");

    }
    oExpReg = /^[\w\s]{3,30}$/;
    if(oExpReg.test($('[name=txtApellidosAltaCli]').val().trim()) == false){

        bValido = false;
        sError += "El apellido no es valido<br>";
        $('[name=txtApellidosAltaCli]').addClass("error");

    }
    oExpReg = /^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)? [0-9A-Z]|\d{8}(-|\.)?[A-Z])$/;
    if(oExpReg.test($('[name=txtDniAltaCli]').val().trim()) == false){
        bValido = false;
        sError += "El dni no es valido<br>";
        $('[name=txtDniAltaCli]').addClass("error");

    }else {
        buscaCliente($('[name=txtDniAltaCli]').val().trim());
        if(bClienteEncontrado) {
            bValido = false;
            sError += "El dni ya existe<br>";
            $('[name=txtDniAltaCli]').addClass("error");
        }
    }

    oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if(oExpReg.test($('[name=txtEmailAltaCli]').val().trim()) == false){

        bValido = false;
        sError += "El email no es valido<br>";
        $('[name=txtEmailAltaCli]').addClass("error");

    }

    oExpReg = /^[\w\s]{3,30}$/;
    if(oExpReg.test($('[name=txtDireccionAltaCli]').val().trim()) == false){

        bValido = false;
        sError += "La direccion no es valida<br>";
        $('[name=txtDireccionAltaCli]').addClass("error");

    }

    oExpReg = /^\d{9}$/;
    if(oExpReg.test($('[name=txtTelefonoAltaCli]').val().trim()) == false){

        bValido = false;
        sError += "El telefono no es valido<br>";
        $('[name=txtTelefonoAltaCli]').addClass("error");

    }
    if(!bValido){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error validacion");
        $("#pMensaje").html(sError);
    }
    return bValido;
}

function tratarRespuestaCliente(oArrayRespuesta,sStatus,oXHR){

    $("#divMensajes").dialog("open");

    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divFrmAltaCliente').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }
}

function tratarErrorAltaCliente(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);
}
function cargaClasesTeoricas(){
    $.get('php/getCLaseTeorica.php',null,cargarCLaTeorica,'json');

}

function cargarCLaTeorica(oArrayProfesores, sStatus, oXHR){
    $("#slAltaCli").empty();

    $(oArrayProfesores).each(function(){
        $('<option>').val(this.cod_claset).text(this.fecha+" "+this.hora).appendTo("#slAltaCli");
    });
}

var bClienteEncontrado=false;
var oAjaxvalidacionCliente = null;

function buscaCliente(sDni){

    var sParametroGET = encodeURI("dni="+sDni);

    var sURL = encodeURI("php/buscaCliente.php?");

    llamadaAjaxValidacionCliente(sURL,sParametroGET);

}

function llamadaAjaxValidacionCliente(sURL,sParametroGET){

    oAjaxvalidacionCliente = objetoXHR();

    oAjaxvalidacionCliente.open("GET",sURL+sParametroGET,false);

    oAjaxvalidacionCliente.onreadystatechange = respuestaValidacionCliente;

    oAjaxvalidacionCliente.send(null);
}

function respuestaValidacionCliente(){

    if(oAjaxvalidacionCliente.readyState == 4 && oAjaxvalidacionCliente.status ==200)	{
        var oArrayRespuesta = JSON.parse(oAjaxvalidacionCliente.responseText);

        bClienteEncontrado = oArrayRespuesta[0];
    }

}
