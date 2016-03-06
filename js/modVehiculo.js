/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$("#divFrmModVehiculo").dialog({
    autoOpen: true,  // Es el valor por defecto
    open:cargarSelectModTipoVehiculo,
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
        click: procesoModVehiculo
    }]
});

function cargarSelectModTipoVehiculo(){
    $("#sltTipoModificarVehi").empty();

    var oArrayTiposVehiculos = JSON.parse(localStorage["tiposVehiculos"]);

    $(oArrayTiposVehiculos).each(function(){
        $('<option>').val(this.tipo).text(this.tipo).appendTo("#sltTipoModificarVehi");
    });

}

function procesoModVehiculo(){

}