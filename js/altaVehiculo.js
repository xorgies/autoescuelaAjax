/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$("#divFrmAltaVehiculo").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:function() {
        cargarSelectAltaTipoVehiculo();
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


function cargarSelectAltaTipoVehiculo(){
    $("#sltTipoAltaVehi").empty();

    //$("<option value='0'>Seleccione un tipo de vehiculo</option>").appendTo("#sltTipoAltaVehi");

    var oArrayTiposVehiculos = JSON.parse(localStorage["tiposVehiculos"]);

    $(oArrayTiposVehiculos).each(function(){
        $('<option>').val(this.tipo).text(this.tipo).appendTo("#sltTipoAltaVehi");
    });

}

function cargarSelectProfesorAltaVehiculo(){
    $.get('php/getProfesores.php',null,cargarProfesoresVehiculo,'json');
}

function cargarProfesoresVehiculo(){
    $("#sltProfAltaVehi").empty();

    var oArrayProfesores = JSON.parse(localStorage["profesores"]);

    $(oArrayProfesores).each(function(){
        $('<option>').val(this.dni).text(this.nombre+" "+this.apellidos).appendTo("#sltProfAltaVehi");
    });
}

function procesoAltaVehiculo(){
    //if(validarAltaVehiculo()){ //todo validar vehiculo
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
    //}
}


function tratarRespuestaAltaVehiculo(oArrayRespuesta,sStatus,oXHR){
    $("#divMensajes").dialog("open");

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

}