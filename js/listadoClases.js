/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$("#divFrmListadoClases").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmClaseListado")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: procesoListadoClase
    }]
});

function procesoListadoClase(){

}