/**
 * Created by iterrero on 24/02/16.
 */

$("#divFrmAltaProfesor").dialog({
    autoOpen: true,  // Es el valor por defecto

    close: function () {
        $("#frmProfesoresAlta")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: procesoAltaProfesor
    }]
});



function procesoAltaProfesor(){
    if(validarAltaProfesor()){
        sNombre=$('[name=txtNombreAltaProf]').val().trim();
        sApellido=$('[name=txtApellidosAltaProf]').val().trim();
        sDni=$('[name=txtDniAltaProf]').val().trim();
        sEmail=$('[name=txtEmailAltaProf]').val().trim();
        sDireccion=$('[name=txtDireccionAltaProf]').val().trim();
        iTelefono=$('[name=txtTelefonoAltaProf]').val().trim();

        var oProfesor={
            nombre:sNombre,
            apellidos:sApellido,
            dni:sDni,
            email:sEmail,
            direccion:sDireccion,
            telefono:iTelefono
        };

        var jProfesor=JSON.stringify(oProfesor);

        $.ajax({ url : "php/altaProfesor.php",
            data:{datos:jProfesor},
            async: true,
            dataType :'json',
            method: "POST",
            cache: false,
            success: tratarRespuestaProfesor,
            error :tratarErrorAltaProfesor
        });
    }
}

function validarAltaProfesor(){
    var bValido=true;
    var sError="";
    //limpia errores
    $('input,select').removeClass("error");

    var oExpReg = /^[\w\s]{3,20}$/;

    if(oExpReg.test($('[name=txtNombreAltaProf]').val().trim()) == false){

            bValido = false;
            sError += "El nombre no es valido<br>";
            $('[name=txtNombreAltaProf]').addClass("error");

    }
    oExpReg = /^[\w\s]{3,30}$/;
    if(oExpReg.test($('[name=txtApellidosAltaProf]').val().trim()) == false){

        bValido = false;
        sError += "El apellido no es valido<br>";
        $('[name=txtApellidosAltaProf]').addClass("error");

    }
    oExpReg = /^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)? [0-9A-Z]|\d{8}(-|\.)?[A-Z])$/;
    if(oExpReg.test($('[name=txtDniAltaProf]').val().trim()) == false){
        bValido = false;
        sError += "El dni no es valido<br>";
        $('[name=txtDniAltaProf]').addClass("error");

    }else {
        buscaProfesor($('[name=txtDniAltaProf]').val().trim());
        if(bProfesorEncontrado) {
            bValido = false;
            sError += "El dni ya existe<br>";
            $('[name=txtDniAltaProf]').addClass("error");
        }
    }

    oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if(oExpReg.test($('[name=txtEmailAltaProf]').val().trim()) == false){

        bValido = false;
        sError += "El email no es valido<br>";
        $('[name=txtEmailAltaProf]').addClass("error");

    }

    oExpReg = /^[\w\s]{3,30}$/;
    if(oExpReg.test($('[name=txtDireccionAltaProf]').val().trim()) == false){

        bValido = false;
        sError += "La direccion no es valida<br>";
        $('[name=txtDireccionAltaProf]').addClass("error");

    }

    oExpReg = /^\d{9}$/;
    if(oExpReg.test($('[name=txtTelefonoAltaProf]').val().trim()) == false){

        bValido = false;
        sError += "El telefono no es valido<br>";
        $('[name=txtTelefonoAltaProf]').addClass("error");

    }
    if(!bValido){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error validacion");
        $("#pMensaje").html(sError);
    }
    return bValido;
}

function tratarRespuestaProfesor(oArrayRespuesta,sStatus,oXHR){

    $("#divMensajes").dialog("open");

    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divFrmAltaProfesor').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }
}

function tratarErrorAltaProfesor(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);
}

var bProfesorEncontrado=false;
var oAjaxvalidacionProfesor = null;

function buscaProfesor(sDni){

    var sParametroGET = encodeURI("dni="+sDni);

    var sURL = encodeURI("php/buscaProfesor.php?");

    llamadaAjaxValidacionProfesor(sURL,sParametroGET);

}

function llamadaAjaxValidacionProfesor(sURL,sParametroGET){

    oAjaxvalidacionProfesor = objetoXHR();

    oAjaxvalidacionProfesor.open("GET",sURL+sParametroGET,false);

    oAjaxvalidacionProfesor.onreadystatechange = respuestaValidacionProfesor;

    oAjaxvalidacionProfesor.send(null);
}

function respuestaValidacionProfesor(){

    if(oAjaxvalidacionProfesor.readyState == 4 && oAjaxvalidacionProfesor.status ==200)	{
        var oArrayRespuesta = JSON.parse(oAjaxvalidacionProfesor.responseText);

        bProfesorEncontrado = oArrayRespuesta[0];
    }

}