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

function procesoListadoVehiculo(){

}