/**
 * Created by iterrero on 8/03/16.
 */
$("#divFrmModProfesorElegir").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:cargarSelectProfesor,
    close: function () {
        $("#frmProfesoresElegir")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: cargarModificaProfesor
    }]
});

function cargarSelectProfesor(){
    $.get('php/getProfesores.php',null,cargarProfesores,'json');
}

function cargarProfesores(oArrayProfesores, sStatus, oXHR){
    $("#sltModificarPro").empty();

    $(oArrayProfesores).each(function(){
        $('<option>').val(this.dni).text(this.nombre+" "+this.apellidos).appendTo("#sltModificarPro");
    });
}

function cargarModificaProfesor(){
    if( $('#frmProfesoresModificar').size() == 0 ){

        $('<div title="Modificar profesor" id="divFrmModProfesor"></div>').appendTo('#formularios').load("html/frmModProfesor.html");

    } else {
        // Lo abro si está cerrado
        $('#divFrmModProfesor').dialog("open");
    }
}
function procesoModProfesor(){
    if(validarModProfesor()){
        sNombre=$('[name=txtNombreModificarProf]').val().trim();
        sApellido=$('[name=txtApellidosModificarProf]').val().trim();
        sDni=$('[name=txtDniModificarProf]').val().trim();
        sEmail=$('[name=txtEmailModificarProf]').val().trim();
        sDireccion=$('[name=txtDireccionModificarProf]').val().trim();
        iTelefono=$('[name=txtTelefonoModificarProf]').val().trim();

        var oProfesor={
            nombre:sNombre,
            apellidos:sApellido,
            dni:sDni,
            email:sEmail,
            direccion:sDireccion,
            telefono:iTelefono
        };

        var jProfesor=JSON.stringify(oProfesor);

        $.ajax({ url : "php/modProfesor.php",
            data:{datos:jProfesor},
            async: true,
            dataType :'json',
            method: "POST",
            cache: false,
            success: tratarRespuestaProfesor,
            error :tratarErrorModProfesor
        });
    }
}

function tratarRespuestaProfesor(oArrayRespuesta,sStatus,oXHR){

    $("#divMensajes").dialog("open");

    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divFrmModProfesor').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }
}

function tratarErrorModProfesor(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);
}

function cargarDatosDialogo(){
    var sProfesor=$('#sltModificarPro').val();
    $("#divFrmModProfesorElegir").dialog("close");

    $.get('php/getProfesor.php?dni='+sProfesor,null,cargarDatos,'json');
}
function cargarDatos(oArray, sStatus, oXHR){
    $('[name=txtNombreModificarProf]').val(oArray[0].nombre);
    $('[name=txtApellidosModificarProf]').val(oArray[0].apellidos);
    $('[name=txtDniModificarProf]').val(oArray[0].dni);
    $('[name=txtEmailModificarProf]').val(oArray[0].email);
    $('[name=txtDireccionModificarProf]').val(oArray[0].direccion);
    $('[name=txtTelefonoModificarProf]').val(oArray[0].telefono);
}
function validarModProfesor(){
    var bValido=true;
    var sError="";
    //limpia errores
    $('input,select').removeClass("error");

    var oExpReg = /^[\w\s]{3,20}$/;

    if(oExpReg.test($('[name=txtNombreModificarProf]').val().trim()) == false){

        bValido = false;
        sError += "El nombre no es valido<br>";
        $('[name=txtNombreModificarProf]').addClass("error");

    }
    oExpReg = /^[\w\s]{3,30}$/;
    if(oExpReg.test($('[name=txtApellidosModificarProf]').val().trim()) == false){

        bValido = false;
        sError += "El apellido no es valido<br>";
        $('[name=txtApellidosModificarProf]').addClass("error");

    }

    oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if(oExpReg.test($('[name=txtEmailModificarProf]').val().trim()) == false){

        bValido = false;
        sError += "El email no es valido<br>";
        $('[name=txtEmailModificarProf]').addClass("error");

    }

    oExpReg = /^[\w\s]{3,30}$/;
    if(oExpReg.test($('[name=txtDireccionModificarProf]').val().trim()) == false){

        bValido = false;
        sError += "La direccion no es valida<br>";
        $('[name=txtDireccionModificarProf]').addClass("error");

    }

    oExpReg = /^\d{9}$/;
    if(oExpReg.test($('[name=txtTelefonoModificarProf]').val().trim()) == false){

        bValido = false;
        sError += "El telefono no es valido<br>";
        $('[name=txtTelefonoModificarProf]').addClass("error");

    }
    if(!bValido){
        $("#divMensajes").dialog("open");
        $("#divMensajes").dialog("option","title","Error validacion");
        $("#pMensaje").html(sError);
    }
    return bValido;
}
