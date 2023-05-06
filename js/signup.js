//               AGREGAR MAYUSCULA AL REGISTRO DE ATLETAS
function mayusculas(e) {
    e.value = e.value.toUpperCase();
}


//                  AGREGAR ATLETAS EN LOCAL STORAGE
const signupForm = document.getElementById("signupForm")
signupForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const edad = document.getElementById("edad").value
    const dni = document.getElementById("dni").value
    const contrasena = document.getElementById("contrasena").value
    const recontrasena = document.getElementById("recontrasena").value
    
    const registroAtletas = JSON.parse(localStorage.getItem("registroAtletas")) ||  []
    const atletaRegistrado = registroAtletas.find(atleta => atleta.dni === dni)
    if(atletaRegistrado){
        return Swal.fire({
            title: "Error en la registración",
            text: "Ya hay un atleta registrado con el mismo DNI",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    registroAtletas.push({"nombre": nombre, "apellido": apellido, "edad": edad, "dni": dni, "contrasena": contrasena, "recontrasena": recontrasena})
    localStorage.setItem("registroAtletas", JSON.stringify(registroAtletas))
    console.table(registroAtletas)
    window.location.href = "login.html"
})


//               REGISTRO DE ADMINISTRADORES CONFECCIONADO CON FUNCION CONSTRUCTORA Y ARRAY
function Administrador (nombre, apellido, dni, contrasena){
    this.nombre= nombre;
    this.apellido=apellido;
    this.dni=dni;
    this.contrasena=contrasena;
}

//                BASE DE DATOS DE LOS ADMINISTRADORES
const administrador1 = new Administrador ("Pedro", "Perez", "35095329","12345")
const administrador2 = new Administrador ("Pablo", "Pedraza","45005333","123456")
const administrador3 = new Administrador ("Carolina", "Bulacios", "40637322","1234567")
const administrador4 = new Administrador ("Paula", "Yance", "34783169","1234")

let registroAdministrador = [administrador1,administrador2,administrador3, administrador4]

function agregarAdministrador (){
    let administrador = new Administrador (nombre, apellido, dni, contrasena)
    agregarAdministrador.push(administrador)
}
console.table(registroAdministrador)


//                FILTROS POR APELLIDO y DNI 

const filtroapellido = registroAdministrador.filter((busquedaapellido) => busquedaapellido.apellido.includes("Perez"))
const filtrodni = registroAdministrador.filter((busquedadni) => busquedadni.dni.includes("34783169"))


console.log(filtroapellido)
console.log(filtrodni)



//                 CANTIDAD DE ADMINSTRADORES REGISTRADOS

const totalAdministrador = registroAdministrador.length
console.log(totalAdministrador)
