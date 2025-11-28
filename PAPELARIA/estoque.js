let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let historico = JSON.parse(localStorage.getItem("historico")) || [];
let usuarioLogado = localStorage.getItem("usuarioLogado") || "Desconhecido";


produtos = produtos.map(p => ({
    ...p,
    quantidade: Number(p.quantidade) || 0,
    minimo: Number(p.minimo) || 0
}));


function ordenarProdutos() {
    produtos.sort((a, b) => a.nome.localeCompare(b.nome));
    localStorage.setItem("produtos", JSON.stringify(produtos));
}


function carregarTabela() {
    ordenarProdutos();
    const tbody = document.getElementById("listaEstoque");
    tbody.innerHTML = "";

    produtos.forEach(p => {
        const alerta = p.quantidade < p.minimo ? "⚠️ Baixo" : "OK";

        tbody.innerHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.quantidade}</td>
                <td>${p.minimo}</td>
                <td>${alerta}</td>
            </tr>
        `;
    });
}


function carregarHistorico() {
    const tbody = document.getElementById("historico");
    tbody.innerHTML = "";

    historico.forEach(h => {
        tbody.innerHTML += `
            <tr>
                <td>${h.data}</td>
                <td>${h.produto}</td>
                <td>${h.tipo}</td>
                <td>${h.quantidade}</td>
                <td>${h.obs || "-"}</td>
            </tr>
        `;
    });
}


document.getElementById("formMovimentacao").addEventListener("submit", function (e) {
    e.preventDefault();

    let nomeProduto = document.getElementById("produto").value.trim();
    let qtd = Number(document.getElementById("quantidade").value);
    let tipo = document.getElementById("tipo").value;
    let obs = document.getElementById("obs").value;
    let msg = document.getElementById("msg");

    if (!nomeProduto || !qtd) {
        msg.innerText = "Preencha todos os campos!";
        return;
    }

    let produto = produtos.find(p => p.nome.toLowerCase() === nomeProduto.toLowerCase());

    if (!produto) {
        msg.innerText = "Produto não encontrado!";
        return;
    }

    if (tipo === "saida" && produto.quantidade < qtd) {
        msg.innerText = "Estoque insuficiente!";
        return;
    }

   
    produto.quantidade = Number(produto.quantidade) + (tipo === "entrada" ? qtd : -qtd);


    localStorage.setItem("produtos", JSON.stringify(produtos));

    if (produto.quantidade < produto.minimo) {
        alert("⚠ Estoque abaixo do mínimo!");
    }

    const hoje = new Date().toLocaleDateString("pt-BR");


    historico.push({
        data: hoje,
        produto: produto.nome,
        tipo,
        quantidade: qtd,
        obs,
        usuario: usuarioLogado,
        saldo: produto.quantidade
    });

    localStorage.setItem("historico", JSON.stringify(historico));

    msg.innerText = "Movimentação registrada!";
    document.getElementById("formMovimentacao").reset();

    carregarTabela();
    carregarHistorico();
});


document.addEventListener("DOMContentLoaded", () => {
    carregarTabela();
    carregarHistorico();
});
