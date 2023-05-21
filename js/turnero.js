const registroAtletas = JSON.parse(localStorage.getItem("login_correcto")) || false
if(!registroAtletas){
    window.location.href = "login.html"
}


//              FUNCION DE LOG OUT FORZADO POR EL PASO DEL TIEMPO CON SET
function mensajeLogOut(){
    Swal.fire({
        title: "Log Out forzado",
        text: "Han transcurrido 10 minutos desde el inicio de su sesión, serás redirigido para Iniciar Sesión nuevamente",
        icon: 'info',    
    })  
}
function redireccion(){
    window.location.href = "login.html"
}

function cancelarLogOut(){
    Swal.fire({
        title: "Estas ahi?",
        text: "Han transcurrido 9 minutos desde su el inicio de su sesión, en un minuto seras redirigido a Iniciar Sesión nuevamente",
        icon: 'info',
    })  
}

setInterval(cancelarLogOut, 540000)
setInterval (mensajeLogOut, 600000);
setTimeout(redireccion, 605000)


//                  VARIABLES DEL TURNERO
    let vencimientocreditos = "2023-06-22";
    const fechaVencimiento = new Date (vencimientocreditos);
    fechaVencimiento.setHours(23,59, 59, 59);
    let totalcreditos = 0;
    let creditosdisponibles = 0;
    let diareserva;
    let cancelareserva;
    const fechaCancelacion = new Date(cancelareserva);

//      OPCION 1 - RESERVA DE TURNOS SOLO CON CREDITOS DISPONIBLES
let botonReserva = document.getElementById("reservaTurno")
botonReserva.addEventListener("click", function reservaTurno(){
    if(totalcreditos == 0){
        Swal.fire({
            title: "No cuenta con creditos",
            text: "Usted no cuenta con creditos disponibles, ingrese en la opción de Renovar abono.",
            icon: 'info',
            confirmButtonText: 'Ok'
        })   
    }
    else{
        Swal.fire({
            title: 'Efectuar reserva',
            html: `<label>Ingrese el dia que quiere asistir (AAAA-MM-DD)</label> 
            <input type="text" name="diareserva" id="diareserva-input"></input>`,
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",  
        })
        .then((result) => {
            if (result.isConfirmed) {
                let diareserva= document.getElementById("diareserva-input").value;
                const fechaActual = new Date();
                fechaActual.setHours(0, 0, 0, 0);
                const fechaReserva = new Date(diareserva + "T00:00:00-03:00");
                fechaReserva.setHours(0, 0, 0, 0);
                console.log("actual: ", fechaActual);
                console.log("reserva:", fechaReserva);
                console.log("vencimiento:", fechaVencimiento);
                //console.log("comparación:",fechaActual.getTime() >= fechaReserva.getTime());
                if(fechaReserva > fechaVencimiento || fechaReserva === "" || fechaReserva === null){
                    diareserva = Swal.fire({
                        title: 'Reingrese reserva',
                        html: `<label>La fecha de reserva es incorrecta, ingrese una fecha valida</label> 
                        <input type="text" name="diareserva" id="diareserva-input"></input>`,
                        showCancelButton: true,
                        confirmButtonText: "Aceptar",
                        cancelButtonText: "Cancelar",  
                    }).then((result) => {
                        if (result.isConfirmed){
                            Swal.fire({
                                title: 'Hora de reserva',
                                html: `<label>Ingrese la hora que desea asistir (DE 8 A 20)</label> 
                                <input type="text" name="diareserva" id="horareserva-input"></input>`,
                                showCancelButton: true,
                                confirmButtonText: "Aceptar",
                                cancelButtonText: "Cancelar",  
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    let horareserva = document.getElementById("horareserva-input").value;
                                    if(horareserva < 8 || horareserva > 20 || horareserva === null){
                                        Swal.fire({
                                            title: 'Hora de reserva incorrecta',
                                            html: `<label>Ha ingresado un horario fuera del establecido, ingrese nuevamente</label> 
                                            <input type="text" name="horareserva" id="horareserva-input"></input>`,
                                            showCancelButton: true,
                                            confirmButtonText: "Aceptar",
                                            cancelButtonText: "Cancelar",  
                                        })
                                        .then((result) => {
                                            if (result.isConfirmed) {
                                                Swal.fire({
                                                    title: "Reserva confirmada",
                                                    text: "Se ha confirmado su reserva",
                                                    icon: 'success',
                                                    confirmButtonText: 'Ok'    
                                                })
                                            }
                                        })
                                        creditosdisponibles = (creditosdisponibles - 1)
                                    }
                                    else{
                                        Swal.fire({
                                            title: "Reserva confirmada",
                                            text: "Se ha confirmado su reserva",
                                            icon: 'success',
                                            confirmButtonText: 'Ok'
                                        }) 
                                        creditosdisponibles = (creditosdisponibles - 1)
                                    }                 
                                }
                            })
                        }
                    })
                }
                else{
                    Swal.fire({
                        title: 'Hora de reserva',
                        html: `<label>Ingrese la hora que desea asistir (DE 8 A 20)</label> 
                        <input type="text" name="horareserva" id="horareserva-input"></input>`,
                        showCancelButton: true,
                        confirmButtonText: "Aceptar",
                        cancelButtonText: "Cancelar",  
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            let horareserva = document.getElementById("horareserva-input").value;
                            if(horareserva < 8 || horareserva > 20 || horareserva === null){
                                Swal.fire({
                                    title: 'Hora de reserva incorrecta',
                                    html: `<label>Ha ingresado un horario fuera del establecido, ingrese nuevamente</label> 
                                    <input type="text" name="diareserva" id="horareserva-input"></input>`,
                                    showCancelButton: true,
                                    confirmButtonText: "Aceptar",
                                    cancelButtonText: "Cancelar",  
                                })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        Swal.fire({
                                            title: "Reserva confirmada",
                                            text: "Se ha confirmado su reserva",
                                            icon: 'success',
                                            confirmButtonText: 'Ok'
                                        })
                                        creditosdisponibles = (creditosdisponibles - 1)
                                    }          
                                })
                            }
                            else{
                                Swal.fire({
                                    title: "Reserva confirmada",
                                    text: "Se ha confirmado su reserva",
                                    icon: 'success',
                                    confirmButtonText: 'Ok'    
                                })
                                creditosdisponibles = (creditosdisponibles - 1) 
                            }
                        }
                    })
                }     
            }
        })
    }
})


//                     OPCION 2 - CREDITOS DISPONIBLES Y UTILIZADOS
let botonCreditos = document.getElementById("creditosDisponibles")
botonCreditos.addEventListener("click", function creditosDisponibles(){
    Swal.fire({
        title: "Creditos Disponibles",
        text: "Usted cuenta con " + creditosdisponibles + " creditos",
        icon: 'info',
        showConfirmButton: true
    })
    .then((result) =>{
        if (result.isConfirmed){
            Swal.fire({
                title: "Creditos Utilizados",
                text: "Usted va utilizando " + (0 + totalcreditos- creditosdisponibles) + " creditos",
                icon: 'info',
                confirmButtonText: 'Ok'
            }
        )}
    })
}) 


//                      OPCION 3 - VENCIMIENTO DE ABONO CON INGRESO MANUAL
let botonVencimiento = document.getElementById("vencimientoCredito")
botonVencimiento.addEventListener("click", function vencimientoCredito(){  
    Swal.fire({
        title: "Vencimiento de Abono",
        text: "Su abono vence el " + vencimientocreditos,
        icon: 'info',
        showConfirmButton: true
    })
})


//                      OPCION 4 - CANCELACION DE RESERVA EFECTUADA
let botonAnulaReserva = document.getElementById("anularReserva")
botonAnulaReserva.addEventListener("click", function anularReserva(){  
    Swal.fire({
        title: 'Anular reserva',
        html: `<label>Ingrese el dia de la reserva que quiere cancelar (AAAA-MM-DD)</label> 
        <input type="text" name="cancelareserva" id="cancelareserva-input"></input>`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",  
    })
    .then((result) => {
        if (result.isConfirmed) {
            let cancelaReserva= document.getElementById("cancelareserva-input").value;
            const fechaActual = new Date();
            fechaActual.setHours(0, 0, 0, 0);
            const fechaCancela = new Date(cancelaReserva + "T00:00:00-03:00");
            fechaCancela.setHours(0, 0, 0, 0);
            console.log("actual: ", fechaActual);
            console.log("reserva:", fechaCancela);
            console.log("vencimiento:", fechaVencimiento);
            //console.log("comparación:",fechaActual.getTime() >= fechaCancela.getTime());
            if(fechaCancela > fechaVencimiento || fechaCancela === "" || fechaCancela === null){
                cancelaReserva = Swal.fire({
                    title: 'Reingrese fecha ',
                    html: `<label>La fecha de la reserva que quiere cancelar es incorrecta, ingrese una fecha valida</label> 
                    <input type="text" name="cancelareserva" id="cancelareserva-input"></input>`,
                    showCancelButton: true,
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar",  
                })
                .then((result) => {
                    if (result.isConfirmed){
                        Swal.fire({
                            title: 'Hora de reserva',
                            html: `<label>Ingrese la hora que desea asistir (DE 8 A 20)</label> 
                            <input type="text" name="diareserva" id="horareserva-input"></input>`,
                            showCancelButton: true,
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",  
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                let horareserva = document.getElementById("horareserva-input").value;
                                if(horareserva < 8 || horareserva > 20 || horareserva === null){
                                    Swal.fire({
                                        title: 'Hora de reserva incorrecta',
                                        html: `<label>Ha ingresado un horario fuera del establecido, ingrese nuevamente</label> 
                                        <input type="text" name="horareserva" id="horareserva-input"></input>`,
                                        showCancelButton: true,
                                        confirmButtonText: "Aceptar",
                                        cancelButtonText: "Cancelar",  
                                    })
                                    .then((result) => {
                                        if (result.isConfirmed) {
                                            Swal.fire({
                                                title: "Anulación confirmada",
                                                text: "Se ha confirmado la anulación de su turno",
                                                icon: 'success',
                                                confirmButtonText: 'Ok'
                                            })
                                            creditosdisponibles = (creditosdisponibles + 1)
                                        }
                                    })
                                }
                                else{
                                    Swal.fire({
                                        title: "Anulación confirmada",
                                        text: "Se ha confirmado la anulación de su turno",
                                        icon: 'success',
                                        confirmButtonText: 'Ok'   
                                    }) 
                                    creditosdisponibles = (creditosdisponibles + 1)
                                }                     
                            }
                        })
                    }
                })
            }
            else{
                Swal.fire({
                    title: 'Horario de la clase',
                    html: `<label>Ingrese el horario de la clase que desea cancelar</label> 
                    <input type="text" name="horareserva" id="horareserva-input"></input>`,
                    showCancelButton: true,
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar",  
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        let horareserva = document.getElementById("horareserva-input").value;
                        if(horareserva < 8 || horareserva > 20 || horareserva === null){
                            Swal.fire({
                                title: 'Hora de reserva incorrecta',
                                html: `<label>Ha ingresado un horario fuera del establecido, ingrese nuevamente</label> 
                                <input type="text" name="diareserva" id="horareserva-input"></input>`,
                                showCancelButton: true,
                                confirmButtonText: "Aceptar",
                                cancelButtonText: "Cancelar",  
                            })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: "Anulación confirmada",
                                        text: "Se ha confirmado la anulación de su turno",
                                        icon: 'success',
                                        confirmButtonText: 'Ok'
                                    })
                                    creditosdisponibles = (creditosdisponibles + 1)
                                }    
                            })
                        }
                        else{
                            Swal.fire({
                                title: "Anulación confirmada",
                                text: "Se ha confirmado la anulación de su turno",
                                icon: 'success',
                                confirmButtonText: 'Ok'    
                            }) 
                            creditosdisponibles = (creditosdisponibles + 1)
                        }        
                    }
                })
            }     
        }
    })
})
    
    
//                        OPCION 5 - RENOVACION DE ABONO CON ACREDITACION AUTOMATICA

let botonRenovarAbono = document.getElementById("renovarAbono")
botonRenovarAbono.addEventListener("click", function renovarAbono(){
    Swal.fire({
        title: 'Renovar abono',
        html: `<label>Elija un plan de abono? 1- Plan mensual ($5.000); 2- Plan trimestral ($13.000); 3- Plan semestral ($22.000); 4- Plan anual ($38.000).</label> 
        <input type="text" name="planes" id="plan-input" autofocus></input>`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",  
    })
    .then((result) => {
        if (result.isConfirmed) {
            let planes= document.getElementById("plan-input").value;  
            if (planes =="1"){
                Swal.fire({
                    title: "Redireccionando",
                    text: "Esta siendo dirigido a la plataforma de pago, una vez abonado volvera a este menu.",
                    icon: 'info',
                    showConfirmButton: true
                })
                .then((result) =>{
                    if (result.isConfirmed){
                        Swal.fire({
                            title: "Abono acreditado",
                            text: "Su pago ha sido completado, ha adquirido 24 creditos.",
                            icon: 'info',
                            confirmButtonText: 'Ok'
                        })
                    }
                })
                creditosdisponibles = creditosdisponibles + 24
                totalcreditos = creditosdisponibles
            }
            else if (planes =="2"){
                Swal.fire({
                    title: "Redireccionando",
                    text: "Esta siendo dirigido a la plataforma de pago, una vez abonado volvera a este menu.",
                    icon: 'info',
                    showConfirmButton: true
                })
                .then((result) =>{
                    if (result.isConfirmed){
                        Swal.fire({
                            title: "Abono acreditado",
                            text: "Su pago ha sido completado, ha adquirido 72 creditos.",
                            icon: 'info',
                            confirmButtonText: 'Ok'
                        })
                    }
                })
                creditosdisponibles = creditosdisponibles + 72
                totalcreditos = creditosdisponibles
            }
            else if (planes =="3"){
                Swal.fire({
                    title: "Redireccionando",
                    text: "Esta siendo dirigido a la plataforma de pago, una vez abonado volvera a este menu.",
                    icon: 'info',
                    showConfirmButton: true
                })
                .then((result) =>{
                    if (result.isConfirmed){
                        Swal.fire({
                            title: "Abono acreditado",
                            text: "Su pago ha sido completado, ha adquirido 144 creditos.",
                            icon: 'info',
                            confirmButtonText: 'Ok'
                        })
                    }
                })
                creditosdisponibles = creditosdisponibles + 144
                totalcreditos = creditosdisponibles
            }
            else if (planes =="4"){
                Swal.fire({
                    title: "Redireccionando",
                    text: "Esta siendo dirigido a la plataforma de pago, una vez abonado volvera a este menu.",
                    icon: 'info',
                    showConfirmButton: true
                })
                .then((result) =>{
                    if (result.isConfirmed){
                        Swal.fire({
                            title: "Abono acreditado",
                            text: "Su pago ha sido completado, ha adquirido 288 creditos.",
                            icon: 'info',
                            confirmButtonText: 'Ok'
                        })
                    }
                })
                creditosdisponibles = creditosdisponibles + 288
                totalcreditos = creditosdisponibles
            }
            else {
                Swal.fire({
                    title: "Opción incorrecta, vualva a intertarlo",
                    text: "La opcion elegida es incorrecta, vuelva a intertarlo",
                    icon: 'info',
                    showConfirmButton: true
                })
            }      
        }
    })
})
          
        
