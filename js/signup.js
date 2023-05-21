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
    if(contrasena != recontrasena){
        return Swal.fire({
            title: "Error en contraseñas",
            text: "Las contraseñas ingresadas no son identicas",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
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
class Administrador {
    constructor(nombre, apellido, dni, contrasena){
    this.nombre= nombre;
    this.apellido=apellido;
    this.dni=dni;
    this.contrasena=contrasena;
}
}

//                BASE DE DATOS DE LOS ADMINISTRADORES
//PARA INCORPORAR NUEVOS ADMINSTRADORES SE INCLUYEN EN EL ADMINISTRADORES.JSON

const registroAdministrador = [];

fetch("../data/administradores.json")
.then(response => response.json())
.then(data => {
    data.forEach(administrador => {
        registroAdministrador.push(new Administrador(administrador.nombre, administrador.apellido, administrador.dni, administrador.contrasena))
    }) 
    console.table(registroAdministrador)


    //                FILTROS POR APELLIDO y DNI 

const filtroapellido = registroAdministrador.filter((busquedaapellido) => busquedaapellido.apellido.includes("Perez"))
const filtrodni = registroAdministrador.filter((busquedadni) => busquedadni.dni.includes("34783169"))


console.log(filtroapellido)
console.log(filtrodni)


//                 CANTIDAD DE ADMINSTRADORES REGISTRADOS

const totalAdministrador = registroAdministrador.length
console.log(totalAdministrador)


})


