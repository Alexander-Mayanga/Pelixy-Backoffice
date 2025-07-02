document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita que se recargue la página

        // Captura los datos
        const username = form.querySelector("input[type='text']").value;
        const password = form.querySelector("input[type='password']").value;

        // Validación simple
        if (username === "admin" && password === "1234") {
            // Guardamos sesión en localStorage
            localStorage.setItem("logueado", "true");

            // Redirigimos al panel principal
            window.location.href = "layout.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
});