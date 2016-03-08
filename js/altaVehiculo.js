/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$("#divFrmAltaVehiculo").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:function() {
        //cargarSelectAltaTipoVehiculo();
        cargarSelectProfesorAltaVehiculo();
    },

    close: function () {
        $("#frmVehiculosAlta")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: procesoAltaVehiculo
    }]
});

/*
function cargarSelectAltaTipoVehiculo(){
    $("#sltTipoAltaVehi").empty();

    //$("<option value='0'>Seleccione un tipo de vehiculo</option>").appendTo("#sltTipoAltaVehi");

    var oArrayTiposVehiculos = JSON.parse(localStorage["tiposVehiculos"]);

    $(oArrayTiposVehiculos).each(function(){
        $('<option>').val(this.tipo).text(this.tipo).appendTo("#sltTipoAltaVehi");
    });

}*/

function cargarSelectProfesorAltaVehiculo(){
    $.get('php/getProfesores.php',null,cargarProfesoresVehiculo,'json');
}

function cargarProfesoresVehiculo(oArrayProfesores, sStatus, oXHR){
    $("#sltProfAltaVehi").empty();

    $(oArrayProfesores).each(function(){
        $('<option>').val(this.dni).text(this.nombre+" "+this.apellidos).appendTo("#sltProfAltaVehi");
    });
}

function procesoAltaVehiculo(){
    if(validarAltaVehiculo()){
        var sMatricula=$("#txtMatriculaAltaVehi").val();
        var sMarca=$("#txtMarcaAltaVehi").val();
        var sModelo=$("#txtModeloAltaVehi").val();
        var sTipo=$("#sltTipoAltaVehi").val();
        var sDniProf=$("#sltProfAltaVehi").val();

        var oVehiculo={
            matricula:sMatricula,
            marca:sMarca,
            modelo:sModelo,
            tipo:sTipo,
            dniProf:sDniProf
        };

        var jVehiculo=JSON.stringify(oVehiculo);

        $.ajax({ url : "php/altaVehiculo.php",
            data:{datos:jVehiculo},
            async: true, // Valor por defecto
            dataType :'json',
            method: "POST",
            cache: false, // ya por defecto es false para POST
            success: tratarRespuestaAltaVehiculo,
            error :tratarErrorAltaVehiculo
        });
    }
}


function tratarRespuestaAltaVehiculo(oArrayRespuesta,sStatus,oXHR){
    $("#divMensajes").dialog("open");

    cargarTiposVehiculo();

    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divFrmAltaVehiculo').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }

}

function tratarErrorAltaVehiculo(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);

}

function validarAltaVehiculo(){
    var bValido=true;
    var sError="";
    //limpia errores
    $('input,select').removeClass("error");

    //campo matricula
    var sMatricula=$("#txtMatriculaAltaVehi").val().trim();
    $("#txtMatriculaAltaVehi").val(sMatricula);

    var oExpReg = /^\d{4}[a-zA-Z]{3}$/;

    if (sMatricula=="" || oExpReg.test(sMatricula) == false) {
        bValido = false;
        sError += "La matricula no es valida<br>";
        $("#txtMatriculaAltaVehi").addClass("error");
    }else {
        buscaVehiculo(sMatricula);
        if(bMatriculaEncontrada) {
            bValido = false;
            sError += "La matricula ya existe<br>";
            $("#").addClass("error");
        }
    }

    //Campo marca
    var sMarca = $("#txtMarcaAltaVehi").val().trim();
    //Campo corregido con trim
    $("#txtMarcaAltaVehi").val(sMarca);

    var oExpReg2 = /^[a-zA-Z\s\u00f1\u00d1]{3,20}$/;

    if(sMarca=="" || oExpReg2.test(sMarca) == false) {
        bValido = false;
        sError += "La marca no es valida<br>";
        $("#txtMarcaAltaVehi").addClass("error");
    }


    //Campo modelo
    var sModelo = $("#txtModeloAltaVehi").val().trim();
    //Campo corregido con trim
    $("#txtModeloAltaVehi").val(sModelo);

    var oExpReg3 = /^[\w\d\s\u00f1\u00d1]{3,25}$/;

    if(sModelo=="" || oExpReg3.test(sModelo) == false) {
        bValido = false;
        sError += "El modelo no es valido";
        $("#txtModeloAltaVehi").addClass("error");
    }



    if(!bValido){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error validacion");
        $("#pMensaje").html(sError);
    }

    return bValido;
}


//variable global
var bMatriculaEncontrada=false;
var oAjaxvalidacionMatricula = null;

function buscaVehiculo(sMatricula){

    var sParametroGET = encodeURI("matricula="+sMatricula);

    // Script de envio
    var sURL = encodeURI("php/buscaVehiculo.php?");

    llamadaAjaxValidacionVehiculo(sURL,sParametroGET);

}

function llamadaAjaxValidacionVehiculo(sURL,sParametroGET){

    oAjaxvalidacionMatricula = objetoXHR();

    oAjaxvalidacionMatricula.open("GET",sURL+sParametroGET,false);

    oAjaxvalidacionMatricula.onreadystatechange = respuestaValidacionMatricula;

    oAjaxvalidacionMatricula.send(null);
}

function respuestaValidacionMatricula(){

    if(oAjaxvalidacionMatricula.readyState == 4 && oAjaxvalidacionMatricula.status ==200)	{
        var oArrayRespuesta = JSON.parse(oAjaxvalidacionMatricula.responseText);

        bMatriculaEncontrada = oArrayRespuesta[0];
    }

}

