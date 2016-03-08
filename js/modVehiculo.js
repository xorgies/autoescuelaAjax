/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$("#divFrmModVehiculoElegir").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:cargarSelectsMod,
    close: function () {
        $("#frmVehiculosModificarElegir")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: abrirDialogoDatos
    }]
});



function abrirDialogoDatos(){
    if( $('#frmVehiculosModificar').size() == 0 ){

        $('<div title="Modificar veh&iacute;culo" id="divFrmModVehiculo"></div>').appendTo('#formularios').load("html/modVehiculo.html");

    } else {
        // Lo abro si está cerrado
        $('#divFrmModVehiculo').dialog("open");
    }
}

function cargarDatosDialogo(){
    var sVehiculoElegido=$('#sltModificarVehi').val();

    $("#divFrmModVehiculoElegir").dialog('close');

    $.get('php/getVehiculo.php?matricula='+sVehiculoElegido,null,cargarDatos,'json');
}
function cargarDatos(oArrayVehiculo, sStatus, oXHR){
    $('#txtMatriculaModificarVehi').val(oArrayVehiculo[0].matricula);
    $('#txtMarcaModificarVehi').val(oArrayVehiculo[0].marca);
    $('#txtModeloModificarVehi').val(oArrayVehiculo[0].modelo);
    $('#sltTipoModificarVehi').val(oArrayVehiculo[0].tipo);
}

function cargarSelectsMod(){
    $.get('php/getVehiculos.php',null,cargarSelectVehiculos,'json');
    //cargarSelectModTipoVehiculo();
}

function cargarSelectVehiculos(oArrayVehiculos, sStatus, oXHR){
    $("#sltModificarVehi").empty();

    $(oArrayVehiculos).each(function(){
        $('<option>').val(this.matricula).text(this.matricula+" - "+this.modelo).appendTo("#sltModificarVehi");
    });
}

/*function cargarSelectModTipoVehiculo(){
    $("#sltTipoModificarVehi").empty();

    var oArrayTiposVehiculos = JSON.parse(localStorage["tiposVehiculos"]);

    $(oArrayTiposVehiculos).each(function(){
        $('<option>').val(this.tipo).text(this.tipo).appendTo("#sltTipoModificarVehi");
    });

}*/


function cargarSelectProfesorModVehiculo(){
    $.get('php/getProfesores.php',null,cargarProfesoresVehiculoMod,'json');
}

function cargarProfesoresVehiculoMod(oArrayProfesores, sStatus, oXHR){
    $("#sltProfModificarVehi").empty();

    $(oArrayProfesores).each(function(){
        $('<option>').val(this.dni).text(this.nombre+" "+this.apellidos).appendTo("#sltProfModificarVehi");
    });
}

function procesoModVehiculo(){


    if(validarModVehiculo()){
        var sMatricula=$("#txtMatriculaModificarVehi").val();
        var sMarca=$("#txtMarcaModificarVehi").val();
        var sModelo=$("#txtModeloModificarVehi").val();
        var sTipo=$("#sltTipoModificarVehi").val();
        var sDniProf=$("#sltProfModificarVehi").val();

        var oVehiculo={
            matricula:sMatricula,
            marca:sMarca,
            modelo:sModelo,
            tipo:sTipo,
            dniProf:sDniProf
        };

        var jVehiculo=JSON.stringify(oVehiculo);

        $.ajax({ url : "php/modificarVehiculo.php",
            data:{datos:jVehiculo},
            async: true, // Valor por defecto
            dataType :'json',
            method: "POST",
            cache: false, // ya por defecto es false para POST
            success: tratarRespuestaModVehiculo,
            error :tratarErrorModVehiculo
        });
    }
}


function tratarRespuestaModVehiculo(oArrayRespuesta,sStatus,oXHR){
    $("#divMensajes").dialog("open");

    cargarTiposVehiculo();

    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divFrmModVehiculo').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }

}

function tratarErrorModVehiculo(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);

}

function validarModVehiculo(){
    var bValido=true;
    var sError="";
    //limpia errores
    $('input,select').removeClass("error");

    //Campo marca
    var sMarca = $("#txtMarcaModificarVehi").val().trim();
    //Campo corregido con trim
    $("#txtMarcaModificarVehi").val(sMarca);

    var oExpReg2 = /^[a-zA-Z\s\u00f1\u00d1]{3,20}$/;

    if(sMarca=="" || oExpReg2.test(sMarca) == false) {
        bValido = false;
        sError += "La marca no es valida<br>";
        $("#txtMarcaModificarVehi").addClass("error");
    }


    //Campo modelo
    var sModelo = $("#txtModeloModificarVehi").val().trim();
    //Campo corregido con trim
    $("#txtModeloModificarVehi").val(sModelo);

    var oExpReg3 = /^[\w\d\s\u00f1\u00d1]{3,25}$/;

    if(sModelo=="" || oExpReg3.test(sModelo) == false) {
        bValido = false;
        sError += "El modelo no es valido";
        $("#txtModeloModificarVehi").addClass("error");
    }



    if(!bValido){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error validacion");
        $("#pMensaje").html(sError);
    }

    return bValido;
}