const usuario = localStorage.getItem("usuarioLogado");

if (!usuario) {  
    window.location.href = "login.html";
} else {  
    document.getElementById("nomeUsuario").textContent = `Olá, ${usuario}!`;
}

document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
});
