//               AGREGAR MAYUSCULA AL REGISTRO DE ATLETAS
function mayusculas(e) {
    e.value = e.value.toUpperCase();
}


//                  AGREGAR ATLETAS EN LOCAL STORAGE
const contactaForm = document.getElementById("contactaForm")
contactaForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const nombre = document.getElementById("nombre")
    const telefono = document.getElementById("telefono")
    const correo = document.getElementById("correo")
    const mensaje = document.getElementById("mensaje")
    

    const registroContacta = JSON.parse(localStorage.getItem("registroContacta")) ||  []
    
    registroContacta.push({"nombre": nombre.value, "telefono": telefono.value, "correo": correo.value, "mensaje": mensaje.value})
    localStorage.setItem("registroContacta", JSON.stringify(registroContacta))
    Swal.fire({
        title: "Consulta enviada!",
        text: "Su consulta ha sido enviada!",
        icon: 'success',
        confirmButtonText: 'Ok'
    })   
})