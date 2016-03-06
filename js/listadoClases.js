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


//El listado al final se mostrara en el dialogo listados
//Se cambiara el title del dialogo y dentro se colocara un <table> con la informacion


function procesoListadoClase(){

}