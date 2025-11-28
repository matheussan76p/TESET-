const usuarios = [
    { email: "admin@saep.com", senha: "1234", nome: "Admin" },
];

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const erro = document.getElementById("mensagemErro");

    erro.textContent = "";

    
    if (email === "" || senha === "") {
        erro.textContent = "Por favor, preencha todos os campos.";
        return;
    }

   
    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
        erro.textContent = "E-mail não encontrado. Verifique e tente novamente.";
        return;
    }


    if (usuario.senha !== senha) {
        erro.textContent = "Senha incorreta.";
        return;
    }

    localStorage.setItem("usuarioLogado", usuario.nome);
    window.location.href = "principal.html"; 
});
