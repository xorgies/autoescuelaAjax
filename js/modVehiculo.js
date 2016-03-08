/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$("#frmVehiculosModificarElegir").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:cargarSelectsMod,
    close: function () {
        $("#frmVehiculosModificar")[0].reset();
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

    $("#frmVehiculosModificarElegir").dialog('close');

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
    cargarSelectModTipoVehiculo();
}

function cargarSelectVehiculos(oArrayVehiculos, sStatus, oXHR){
    $("#sltModificarVehi").empty();

    $(oArrayVehiculos).each(function(){
        $('<option>').val(this.matricula).text(this.matricula+" - "+this.modelo).appendTo("#sltModificarVehi");
    });
}

function cargarSelectModTipoVehiculo(){
    $("#sltTipoModificarVehi").empty();

    var oArrayTiposVehiculos = JSON.parse(localStorage["tiposVehiculos"]);

    $(oArrayTiposVehiculos).each(function(){
        $('<option>').val(this.tipo).text(this.tipo).appendTo("#sltTipoModificarVehi");
    });

}


function cargarSelectProfesorModVehiculo(){
    $.get('php/getProfesores.php',null,cargarProfesoresVehiculoMod,'json');
}

function cargarProfesoresVehiculoMod(){
    $("#sltProfModificarVehi").empty();

    var oArrayProfesores = JSON.parse(localStorage["profesores"]);

    $(oArrayProfesores).each(function(){
        $('<option>').val(this.dni).text(this.nombre+" "+this.apellidos).appendTo("#sltProfModificarVehi");
    });
}

function procesoModVehiculo(){


    //if(validarModVehiculo()){ //todo validar vehiculo
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
    //}
}


function tratarRespuestaModVehiculo(oArrayRespuesta,sStatus,oXHR){
    $("#divMensajes").dialog("open");

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

}