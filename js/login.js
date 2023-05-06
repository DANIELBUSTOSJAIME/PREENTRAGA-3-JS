const loginForm = document.getElementById("loginForm")
loginForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    const dni = document.getElementById("dni").value 
    const contrasena = document.getElementById("contrasena").value
    const registroAtletas = JSON.parse(localStorage.getItem("registroAtletas")) || []
    const validacionatleta = registroAtletas.find(registroAtletas => registroAtletas.dni === dni && registroAtletas.contrasena === contrasena)
    if (!validacionatleta){
        return Swal.fire({
            title: "Error en inicio de sesión",
            text: "El usuario y/o contraseña ingresados son incorrectos",
            icon: 'error',
            confirmButtonText: 'Ok'
        })   
    }
    localStorage.setItem("login_correcto", JSON.stringify(validacionatleta))

    window.location.href = "../pages/turnero.html"
   
})


