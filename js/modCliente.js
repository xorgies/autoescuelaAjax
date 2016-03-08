/**
 * Created by Isa on 8/03/16.
 */
$("#divFrmModClienteElegir").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:cargarSelectCliente,
    close: function () {
        $("#frmClientesElegir")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: cargarModificaCliente
    }]
});

function cargarSelectCliente(){
    $.get('php/getClientes.php',null,cargarClientes,'json');
}

function cargarClientes(oArrayClientes, sStatus, oXHR){
    $("#sltModificarCli").empty();

    $(oArrayClientes).each(function(){
        $('<option>').val(this.dni).text(this.nombre+" "+this.apellidos).appendTo("#sltModificarCli");
    });
}

function cargarModificaCliente(){
    if( $('#frmClientesModificar').size() == 0 ){

        $('<div title="Modificar Cliente" id="divFrmModCliente"></div>').appendTo('#formularios').load("html/frmModCliente.html");

    } else {
        // Lo abro si está cerrado
        $('#divFrmModCliente').dialog("open");
    }
}
function procesoModCliente(){
    if(validarModCliente()){
        sNombre=$('[name=txtNombreModificarCli]').val().trim();
        sApellido=$('[name=txtApellidosModificarCli]').val().trim();
        sDni=$('[name=txtDniModificarCli]').val().trim();
        sEmail=$('[name=txtEmailModificarCli]').val().trim();
        sDireccion=$('[name=txtDireccionModificarCli]').val().trim();
        iTelefono=$('[name=txtTelefonoModificarCli]').val().trim();
        iClase=$('#slModificaCli').val().trim();

        var oCliente={
            nombre:sNombre,
            apellidos:sApellido,
            dni:sDni,
            email:sEmail,
            direccion:sDireccion,
            telefono:iTelefono,
            clase:iClase
        };

        var jCliente=JSON.stringify(oCliente);

        $.ajax({ url : "php/modCliente.php",
            data:{datos:jCliente},
            async: true,
            dataType :'json',
            method: "POST",
            cache: false,
            success: tratarRespuestaCliente,
            error :tratarErrorModCliente
        });
    }
}

function tratarRespuestaCliente(oArrayRespuesta,sStatus,oXHR){

    $("#divMensajes").dialog("open");

    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divFrmModCliente').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }
}

function tratarErrorModCliente(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);
}

function cargarDatosDialogo(){
    var sCliente=$('#sltModificarCli').val();
    $("#divFrmModClienteElegir").dialog("close");

    $.get('php/getCliente.php?dni='+sCliente,null,cargarDatos,'json');
}
function cargarDatos(oArray, sStatus, oXHR){
    $('[name=txtNombreModificarCli]').val(oArray[0].nombre);
    $('[name=txtApellidosModificarCli]').val(oArray[0].apellidos);
    $('[name=txtDniModificarCli]').val(oArray[0].dni);
    $('[name=txtEmailModificarCli]').val(oArray[0].email);
    $('[name=txtDireccionModificarCli]').val(oArray[0].direccion);
    $('[name=txtTelefonoModificarCli]').val(oArray[0].telefono);
    $("#slModificaCli").val(oArray[0].cod_claset);
}
function validarModCliente(){
    var bValido=true;
    var sError="";
    //limpia errores
    $('input,select').removeClass("error");

    var oExpReg = /^[\w\s]{3,20}$/;

    if(oExpReg.test($('[name=txtNombreModificarCli]').val().trim()) == false){

        bValido = false;
        sError += "El nombre no es valido<br>";
        $('[name=txtNombreModificarCli]').addClass("error");

    }
    oExpReg = /^[\w\s]{3,30}$/;
    if(oExpReg.test($('[name=txtApellidosModificarCli]').val().trim()) == false){

        bValido = false;
        sError += "El apellido no es valido<br>";
        $('[name=txtApellidosModificarCli]').addClass("error");

    }


    oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if(oExpReg.test($('[name=txtEmailModificarCli]').val().trim()) == false){

        bValido = false;
        sError += "El email no es valido<br>";
        $('[name=txtEmailModificarCli]').addClass("error");

    }

    oExpReg = /^[\w\s]{3,30}$/;
    if(oExpReg.test($('[name=txtDireccionModificarCli]').val().trim()) == false){

        bValido = false;
        sError += "La direccion no es valida<br>";
        $('[name=txtDireccionModificarCli]').addClass("error");

    }

    oExpReg = /^\d{9}$/;
    if(oExpReg.test($('[name=txtTelefonoModificarCli]').val().trim()) == false){

        bValido = false;
        sError += "El telefono no es valido<br>";
        $('[name=txtTelefonoModificarCli]').addClass("error");

    }
    if(!bValido){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error validacion");
        $("#pMensaje").html(sError);
    }
    return bValido;
}
function cargaClasesTeoricas(){
    $.get('php/getCLaseTeorica.php',null,cargarCLaTeorica,'json');

}

function cargarCLaTeorica(oArrayProfesores, sStatus, oXHR){
    $("#slModificaCli").empty();

    $(oArrayProfesores).each(function(){
        $('<option>').val(this.cod_claset).text(this.fecha+" "+this.hora).appendTo("#slModificaCli");
    });
    cargarDatosDialogo();
}