if (!localStorage.getItem("produtos")) {
    const exemplos = [
        { id: 1, nome: "Caneta Azul", descricao: "Esferográfica", estoque: 100, minimo: 20, sku: "SKU001" },
        { id: 2, nome: "Papel A4", descricao: "500 folhas", estoque: 500, minimo: 100, sku: "SKU002" },
        { id: 3, nome: "Caderno", descricao: "200 folhas", estoque: 50, minimo: 10, sku: "SKU003" }
    ];
    localStorage.setItem("produtos", JSON.stringify(exemplos));
}

function carregarTabela(lista = null) {
    const tabela = document.getElementById("tabelaProdutos");
    tabela.innerHTML = "";

    const produtos = lista || JSON.parse(localStorage.getItem("produtos"));

    produtos.forEach(p => {
        const linha = `
            <tr>
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>${p.descricao}</td>
                <td>${p.estoque}</td>
                <td>${p.minimo}</td>
                <td>${p.sku}</td>
                <td>
                    <button class="editar" onclick="editarProduto(${p.id})">Editar</button>
                    <button class="excluir" onclick="excluirProduto(${p.id})">Excluir</button>
                </td>
            </tr>
        `;
        tabela.innerHTML += linha;
    });
}

carregarTabela();

document.getElementById("produtoForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const estoque = document.getElementById("estoque").value.trim();
    const minimo = document.getElementById("estoqueMinimo").value.trim();
    const sku = document.getElementById("sku").value.trim();
    const idEdit = document.getElementById("idProduto").value;

    const mensagem = document.getElementById("mensagem");

    if (!nome || !descricao || !estoque || !minimo || !sku) {
        mensagem.textContent = "Preencha todos os campos!";
        return;
    }

    if (estoque < 0 || minimo < 0) {
        mensagem.textContent = "Valores negativos não são permitidos.";
        return;
    }

    let produtos = JSON.parse(localStorage.getItem("produtos"));

    if (idEdit) {
        const index = produtos.findIndex(p => p.id == idEdit);

        produtos[index] = {
            id: Number(idEdit),
            nome,
            descricao,
            estoque: Number(estoque),
            minimo: Number(minimo),
            sku
        };

        mensagem.textContent = "Produto atualizado com sucesso!";
    }
    else {
        const novoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;

        produtos.push({
            id: novoId,
            nome,
            descricao,
            estoque: Number(estoque),
            minimo: Number(minimo),
            sku
        });

        mensagem.textContent = "Produto cadastrado com sucesso!";
    }

    localStorage.setItem("produtos", JSON.stringify(produtos));

    this.reset();
    document.getElementById("idProduto").value = "";
    document.getElementById("tituloForm").textContent = "Adicionar Produto";

    carregarTabela();
});


function buscarProduto() {
    const termo = document.getElementById("campoBusca").value.toLowerCase();
    const produtos = JSON.parse(localStorage.getItem("produtos"));

    const filtrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo) ||
        p.sku.toLowerCase().includes(termo)
    );

    carregarTabela(filtrados);
}

function editarProduto(id) {
    const produtos = JSON.parse(localStorage.getItem("produtos"));
    const p = produtos.find(pr => pr.id === id);

    document.getElementById("idProduto").value = p.id;
    document.getElementById("nome").value = p.nome;
    document.getElementById("descricao").value = p.descricao;
    document.getElementById("estoque").value = p.estoque;
    document.getElementById("estoqueMinimo").value = p.minimo;
    document.getElementById("sku").value = p.sku;

    document.getElementById("tituloForm").textContent = "Editar Produto";
}

function excluirProduto(id) {
    if (!confirm("Deseja mesmo excluir este produto?")) return;

    let produtos = JSON.parse(localStorage.getItem("produtos"));
    produtos = produtos.filter(p => p.id !== id);

    localStorage.setItem("produtos", JSON.stringify(produtos));
    carregarTabela();
}
