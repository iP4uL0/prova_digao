
const botao_salvar = document.querySelector("#Salvar");

botao_salvar.addEventListener("click", async function(event) {
    event.preventDefault();

    const autor = document.getElementById("nomeautor").value;
    const titulo = document.getElementById("nomelivro").value;
    const sinopse = document.getElementById("sinopse").value;
    const data = document.getElementById("datalivro").value;

    if (!autor || !titulo || !sinopse || !data) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    await adicionarLivro(autor, titulo, sinopse, data);
});

async function adicionarLivro(autor, titulo, sinopse, data) {
    try {
        const response = await fetch("http://localhost:3000/livros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ autor, titulo, sinopse, data }),
        });

        if (response.ok) {
            alert("Livro cadastrado com sucesso!");
            document.getElementById("formulario").reset(); // Limpa o formulário
        } else {
            const data = await response.json();
            alert(data.error || "Erro ao cadastrar o livro.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar livro:", error);
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
        const response = await fetch("http://localhost:3000/livros"); // Ajuste a URL se necessário
        const livros = await response.json();

        if (!Array.isArray(livros) || livros.length === 0) {
            container.innerHTML = "<p>Nenhum livro cadastrado ainda.</p>";
            return;
        }

        livros.forEach((livro) => {
            const elemento = document.createElement("div");
            elemento.classList.add("livro-item");
            elemento.innerHTML = `
                <h3>${livro.titulo}</h3>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p><strong>Data:</strong> ${livro.data}</p>
                <p><strong>Sinopse:</strong><br>${livro.sinopse}</p>
                <hr>
            `;
            container.appendChild(elemento);
        });
    } catch (error) {
        console.error("Erro ao carregar livros:", error);
        container.innerHTML = "<p>Erro ao carregar livros. Tente novamente.</p>";
    }
}

