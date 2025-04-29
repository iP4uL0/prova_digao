
const botao_salvar = document.querySelector("#botaosalvar");

botao_salvar.addEventListener("click", async function(event) {
    event.preventDefault();

    const autor = document.getElementById("nomeautor").value;
    const titulo = document.getElementById("nomelivro").value;
    const ano_publicacao = document.getElementById("datalivro").value;
    const genero = document.getElementById("genero").value
    const resumo = document.getElementById("sinopse").value;

    await adicionarLivro(titulo, autor, ano_publicacao,genero, resumo);
});

async function adicionarLivro(titulo, autor,ano_publicacao ,genero , resumo) {
    try {
        const response = await fetch("http://192.168.1.5:3000/livros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                titulo: titulo, 
                autor: autor, 
                ano_publicacao: ano_publicacao, 
                genero: genero,
                resumo: resumo
                 
            }),
        });

        if (response.ok) {
            alert("Livro cadastrado com sucesso!");
            document.getElementById("formulario").reset(); // Limpa o formulário
        } else {
            const data = await response.json();
            alert(data.error || "Erro ao cadastrar o livro.");
        }
    } catch  {
               alert("Erro na conexão. Tente novamente.");
    }
}
// Carregar livros
document.addEventListener("DOMContentLoaded", () => {
    CarregarLivros(); // Chama ao carregar a página
});

async function CarregarLivros() {
    const container = document.getElementById("livrosadicionados");
    container.innerHTML = ""; // Limpa o conteúdo antes de carregar

    try {
        const response = await fetch("http://192.168.1.5:3000/livrosCad"); // Ajuste a URL se necessário
        const livros = await response.json();

     

        livros.forEach((livro) => {
            const elemento = document.createElement("div");
            elemento.classList.add("livro-item");
            elemento.innerHTML = `
                <h3>${livro.titulo}</h3>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p><strong>Data:</strong> ${livro.ano_publicacao}</p>
                <p><strong>Genero:</strong><br>${livro.genero}</p>
                <p><strong>Sinopse:</strong><br>${livro.resumo}</p>
             
            `;
            container.appendChild(elemento);
        });
    } catch (error) {
        console.error("Erro ao carregar livros:", error);
        container.innerHTML = "<p>  Tente novamente Erro ao carregar livros.</p>";
    }
}

