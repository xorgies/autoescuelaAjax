//objeto Vehiculo------------------------------------------------------
    function Vehiculo(sMatricula,sMarca,sModelo,sTipo){
        this.matricula=sMatricula;
        this.marca=sMarca;
        this.modelo= sModelo;
        this.tipo=sTipo;
    }


//objeto Persona------------------------------------------------------
function Persona(sApellidos,sDireccion,sDni,sEmail,sNombre,iTelefono){
    this.apellidos=sApellidos;
    this.direccion=sDireccion;
    this.dni= sDni;
    this.email=sEmail;
    this.nombre=sNombre;
    this.telefono=iTelefono;
}


//objeto Profesor------------------------------------------------------
//hereda de Persona
function Profesor(sApellidos,sDireccion,sDni,sEmail,sNombre,iTelefono,sId){
    Persona.apply(this,[sApellidos,sDireccion,sDni,sEmail,sNombre,iTelefono]);
    this.id=sId;
}
//herencia
Profesor.prototype = Object.create(Persona.prototype);
Profesor.prototype.constructor = Profesor;


//objeto Cliente------------------------------------------------------
//hereda de Persona
function Cliente(sApellidos,sDireccion,sDni,sEmail,sNombre,iTelefono,sNumeroRegistro){
    Persona.apply(this,[sApellidos,sDireccion,sDni,sEmail,sNombre,iTelefono]);
    this.numeroRegistro=sNumeroRegistro;
}
//herencia
Cliente.prototype = Object.create(Persona.prototype);
Cliente.prototype.constructor = Cliente;


//objeto Clases------------------------------------------------------
function Clases(fDuracion,dFecha,sHora){
    this.duracion=fDuracion;
    this.fecha=dFecha;
    this.hora=sHora;
}

//objeto Practica------------------------------------------------------
//hereda de Clases
function Practica(fDuracion,dFecha,sHora,fTarifa_hora){
    Clases.apply(this,[fDuracion,dFecha,sHora]);
    this.tarifa_hora=fTarifa_hora;
}
//herencia
Practica.prototype = Object.create(Clases.prototype);
Practica.prototype.constructor = Practica;

//objeto Teorica------------------------------------------------------
//hereda de Clases
function Teorica(fDuracion,dFecha,sHora,iAforo){
    Clases.apply(this,[fDuracion,dFecha,sHora]);
    this.aforo=iAforo;
}
//herencia
Teorica.prototype = Object.create(Clases.prototype);
Teorica.prototype.constructor = Teorica;
