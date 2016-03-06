/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$("#divFrmAltaVehiculo").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:cargarSelectAltaTipoVehiculo,
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

    $("<option value='0'>Seleccione un tipo de vehiculo</option>").appendTo("#sltTipoAltaVehi");

    var oArrayTiposVehiculos = JSON.parse(localStorage["tiposVehiculos"]);

    $(oArrayTiposVehiculos).each(function(){
        $('<option>').val(this.tipo).text(this.tipo).appendTo("#sltTipoAltaVehi");
    });

}

function procesoAltaVehiculo(){

}