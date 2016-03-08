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

var oAjaxListadoClase=null;
var sTipoListado="";

function procesoListadoClase(){
    sTipoListado=frmClaseListado.tipoClase.value;

    var sParametroGET = encodeURI("tipo="+sTipoListado);

    // Script de envio
    var sURL = encodeURI("php/listadoClase.php?");

    llamadaAjaxListadoClase(sURL,sParametroGET);
}


function llamadaAjaxListadoClase(sURL,sParametroGET){

    oAjaxListadoClase = objetoXHR();

    oAjaxListadoClase.open("GET",sURL+sParametroGET,true);

    oAjaxListadoClase.onreadystatechange = respuestaListadoClase;

    oAjaxListadoClase.send(null);
}





function respuestaListadoClase(){

    if(oAjaxListadoClase.readyState == 4 && oAjaxListadoClase.status ==200)	{
        //Recojo el documento XML en variable global
        var oXML = oAjaxListadoClase.responseXML;

        procesaXML(oXML);
    }

}

function procesaXML(oXML){

    //borrar tabla si habia
    $("#listado").remove();

    var jqTabla = $('<table id="listado" border="1">');

    var oClases = oXML.getElementsByTagName("clase");
    if(sTipoListado=="teorica"){
        $('<tr><th>Codigo clase</th><th>Duracion</th><th>Fecha</th><th>Hora</th><th>Aforo</th><th>DNI profesor</th></tr>').appendTo(jqTabla);
        for(var i=0;i<oClases.length;i++){
            $('<tr>' +
                '<td>'+oClases[i].getElementsByTagName('cod_claset')[0].textContent+'</td>' +
                '<td>'+oClases[i].getElementsByTagName('duracion')[0].textContent+'</td>' +
                '<td>'+oClases[i].getElementsByTagName('fecha')[0].textContent+'</td>' +
                '<td>'+oClases[i].getElementsByTagName('hora')[0].textContent+'</td>' +
                '<td>'+oClases[i].getElementsByTagName('aforo')[0].textContent+'</td>' +
                '<td>'+oClases[i].getElementsByTagName('dni_prof')[0].textContent+'</td>' +
                '</tr>').appendTo(jqTabla);

        }
    }else {
        $('<tr><th>ID clase</th><th>Duracion</th><th>Fecha</th><th>Hora</th><th>Tarifa/hora</th><th>DNI profesor</th><th>DNI cliente</th></tr>').appendTo(jqTabla);
        for(var i=0;i<oClases.length;i++){
            $('<tr>' +
                '<td>'+oClases[i].getElementsByTagName('id_clasep')[0].textContent+'</td>' +
                '<td>'+oClases[i].getElementsByTagName('duracion')[0].textContent+'</td>' +
                '<td>'+oClases[i].getElementsByTagName('fecha')[0].textContent+'</td>' +
                '<td>'+oClases[i].getElementsByTagName('hora')[0].textContent+'</td>' +
                '<td>'+oClases[i].getElementsByTagName('tarifa_horaria')[0].textContent+'</td>' +
                '<td>'+oClases[i].getElementsByTagName('dni_profesor')[0].textContent+'</td>' +
                '<td>'+oClases[i].getElementsByTagName('dni_cliente')[0].textContent+'</td>' +
                '</tr>').appendTo(jqTabla);

        }
    }

    jqTabla.appendTo("#listados");
    $('#listados').dialog('open');

}