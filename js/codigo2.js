/**
 * Created by Sergio Lopez Castaño on 29/02/2016.
 */
$(function(){
    var oLI=$(".dropdown ul li");

    //Menu Alta Profesor
    oLI[0].addEventListener("click",mostrarAltaProfesor,false);
    //Menu Modificacion Profesor
    oLI[1].addEventListener("click",mostrarModificarProfesor,false);
    //Menu Listado Profesor
    oLI[2].addEventListener("click",mostrarListadoProfesor,false);

    //Menu Alta Cliente
    oLI[3].addEventListener("click",mostrarAltaCliente,false);
    //Menu Modificacion Cliente
    oLI[4].addEventListener("click",mostrarModificarCliente,false);
    //Menu Listado Cliente
    oLI[5].addEventListener("click",mostrarListadoCliente,false);

    //Menu Alta Vehiculo
    oLI[6].addEventListener("click",mostrarAltaVehiculo,false);
    //Menu Modificacion Vehiculo
    oLI[7].addEventListener("click",mostrarModificarVehiculo,false);
    //Menu Listado Vehiculo
    oLI[8].addEventListener("click",mostrarListadoVehiculo,false);

    //Menu Alta Clase
    oLI[9].addEventListener("click",mostrarAltaClase,false);
    //Menu Listado Clase
    oLI[10].addEventListener("click",mostrarListadoClase,false);


});


//------Funciones mostrarProfesor--------
function mostrarAltaProfesor(){
    ocultarTodosFormularios();

    var oCapa = document.getElementById("altaProfesor");
    limpiarCampos(oCapa);
    oCapa.classList.remove("oculto");
    oCapa.classList.add("capaVisible");
}
function mostrarModificarProfesor(){
    ocultarTodosFormularios();

    var oCapa = document.getElementById("modificarProfesor");
    limpiarCampos(oCapa);
    oCapa.classList.remove("oculto");
    oCapa.classList.add("capaVisible");

    oCapa.querySelector("input[type=button]").disabled = true;

    cargarSelectModificarProfesor();
}
function mostrarListadoProfesor(){
    ocultarTodosFormularios();

    var oCapa = document.getElementById("listadosTablas");
    limpiarCampos(oCapa);
    oCapa.classList.remove("oculto");
    oCapa.classList.add("capaVisible");

    oCapa.appendChild(tablaProfesores());
}
//------Fin Funciones mostrarProfesor--------

//------Funciones mostrarCliente--------
function mostrarAltaCliente(){
    ocultarTodosFormularios();

    var oCapa = document.getElementById("altaCliente");
    limpiarCampos(oCapa);
    oCapa.classList.remove("oculto");
    oCapa.classList.add("capaVisible");
}
function mostrarModificarCliente(){
    ocultarTodosFormularios();

    var oCapa = document.getElementById("modificarCliente");
    limpiarCampos(oCapa);
    oCapa.classList.remove("oculto");
    oCapa.classList.add("capaVisible");

    oCapa.querySelector("input[type=button]").disabled = true;

    cargarSelectModificarCliente();
}
function mostrarListadoCliente(){
    ocultarTodosFormularios();

    var oCapa = document.getElementById("listadosTablas");
    limpiarCampos(oCapa);
    oCapa.classList.remove("oculto");
    oCapa.classList.add("capaVisible");

    oCapa.appendChild(tablaClientes());

}
//------Fin Funciones mostrarCliente--------

//------Funciones mostrarVehiculo--------
function mostrarAltaVehiculo(){
    ocultarTodosFormularios();

    var oCapa = document.getElementById("altaVehiculo");
    limpiarCampos(oCapa);
    oCapa.classList.remove("oculto");
    oCapa.classList.add("capaVisible");
}
function mostrarModificarVehiculo(){
    ocultarTodosFormularios();

    var oCapa = document.getElementById("modificarVehiculo");
    limpiarCampos(oCapa);
    oCapa.classList.remove("oculto");
    oCapa.classList.add("capaVisible");

    oCapa.querySelector("input[type=button]").disabled = true;

    cargarSelectModificarVehiculo();
}
function mostrarListadoVehiculo(){
    ocultarTodosFormularios();

    var oCapa = document.getElementById("listadosTablas");
    limpiarCampos(oCapa);
    oCapa.classList.remove("oculto");
    oCapa.classList.add("capaVisible");

    oCapa.appendChild(tablaVehiculos());

}
//------Funciones mostrarVehiculo--------

//------Funciones mostrarClase--------
function mostrarAltaClase(){
    ocultarTodosFormularios();

    var oCapa = document.getElementById("altaClase");
    limpiarCampos(oCapa);
    oCapa.classList.remove("oculto");
    oCapa.classList.add("capaVisible");
}
function mostrarListadoClase(){
    ocultarTodosFormularios();

    var oCapa = document.getElementById("listadosTablas");
    limpiarCampos(oCapa);
    oCapa.classList.remove("oculto");
    oCapa.classList.add("capaVisible");

    oCapa.appendChild(tablaClases());

}
//------Funciones mostrarClase--------