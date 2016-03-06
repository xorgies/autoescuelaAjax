/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$("#divFrmModVehiculo").dialog({
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
        click: procesoModVehiculo
    }]
});
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

function procesoModVehiculo(){

}