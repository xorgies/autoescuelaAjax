/**
 * Created by Sergio Lopez Castaño on 06/03/2016.
 */
$("#divFrmAltaClaseTeorica").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmClaseTeoricaAlta")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:false,
    buttons: [{
        text: "Aceptar",
        click: procesoAltaClaseTeorica
    }]
});

var dias = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

$('#txtFechaAltaClaTeorica').datepicker({
    monthNamesShort: meses,
    dayNamesMin: dias,
    changeYear: true,
    changeMonth: true
});

function procesoAltaClaseTeorica(){

}