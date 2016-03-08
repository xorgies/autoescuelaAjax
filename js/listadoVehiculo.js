/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$("#divFrmListadoVehiculo").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:cargarSelectListadoTipoVehiculo,
    close: function () {
        $("#frmVehiculoListado")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: procesoListadoVehiculo
    }]
});

function cargarSelectListadoTipoVehiculo(){
    $("#tipoVehiculo").empty();

    $("<option value='todos'>todos</option>").appendTo("#tipoVehiculo");

    var oArrayTiposVehiculos = JSON.parse(localStorage["tiposVehiculos"]);

    $(oArrayTiposVehiculos).each(function(){
        $('<option>').val(this.tipo).text(this.tipo).appendTo("#tipoVehiculo");
    });

}

var oAjaxListadoVehiculo=null;

function procesoListadoVehiculo(){
    var sTipoListado=frmVehiculoListado.tipoVehiculo.value;

    var sParametroGET = encodeURI("tipo="+sTipoListado);

    // Script de envio
    var sURL = encodeURI("php/listadoVehiculo.php?");

    llamadaAjaxListadoVehiculo(sURL,sParametroGET);
}


function llamadaAjaxListadoVehiculo(sURL,sParametroGET){

    oAjaxListadoVehiculo = objetoXHR();

    oAjaxListadoVehiculo.open("GET",sURL+sParametroGET,true);

    oAjaxListadoVehiculo.onreadystatechange = respuestaListadoVehiculo;

    oAjaxListadoVehiculo.send(null);
}





function respuestaListadoVehiculo(){

    if(oAjaxListadoVehiculo.readyState == 4 && oAjaxListadoVehiculo.status ==200)	{
        //Recojo el documento XML en variable global
        var oXML = oAjaxListadoVehiculo.responseXML;

        procesaXMLvehiculo(oXML);
    }

}

function procesaXMLvehiculo(oXML){

    //borrar tabla si habia
    $("#listado").remove();

    var jqTabla = $('<table id="listado" border="1">');

    var oVehiculos = oXML.getElementsByTagName("vehiculo");

    $('<tr><th>Matricula</th><th>Marca</th><th>Modelo</th><th>Tipo</th><th>DNI profesor</th></tr>').appendTo(jqTabla);
    for(var i=0;i<oVehiculos.length;i++){
            $('<tr>' +
                '<td>'+oVehiculos[i].getElementsByTagName('matricula')[0].textContent+'</td>' +
                '<td>'+oVehiculos[i].getElementsByTagName('marca')[0].textContent+'</td>' +
                '<td>'+oVehiculos[i].getElementsByTagName('modelo')[0].textContent+'</td>' +
                '<td>'+oVehiculos[i].getElementsByTagName('tipo')[0].textContent+'</td>' +
                '<td>'+oVehiculos[i].getElementsByTagName('dni_prof')[0].textContent+'</td>' +
                '</tr>').appendTo(jqTabla);
    }


    jqTabla.appendTo("#listados");
    $('#listados').dialog('open');

}