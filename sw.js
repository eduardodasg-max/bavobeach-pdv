Aqui está o seu código atualizado: BravoBeach_PDV_Estoque.html.
O sistema foi aprimorado com um controle automático de estoque, focado principalmente nas bebidas (Drinks e Sem Álcool), mas aplicável a qualquer produto cadastrado.

📦 O que foi implementado nesta nova versão:

1. 📊 Controle de Saldo de Estoque: No gerenciamento de produtos (Aba Configurações), agora há um campo para definir a Quantidade em Estoque. Se você deixar em branco ou colocar 0, o sistema entenderá que o estoque é controlado e iniciará zerado.
2. 📉 Baixa Automática em 1 Clique: Ao clicar no botão do produto dentro de uma mesa, o sistema verifica o estoque disponível. Se houver saldo, ele adiciona o item à mesa e subtrai 1 unidade do estoque automaticamente em tempo real.
3. 🚫 Bloqueio de Venda Sem Estoque: Caso o estoque de uma bebida chegue a 0, o botão correspondente no menu da mesa fica visualmente cinza, exibe o aviso (Esgotado) e bloqueia novos cliques para evitar vendas indesejadas.
4. 🔄 Estorno Automático no Cancelamento: Se você remover um item da mesa (usando a senha master) ou se a mesa inteira for cancelada, todas as unidades correspondentes voltam automaticamente para o estoque.
5. 🏷️ Indicador de Saldo Disponível: O botão de cada produto nas categorias agora exibe em letras pequenas o estoque atual (ex: Estoque: 12 un), facilitando o controle visual do garçom antes de oferecer ao cliente.

💾 Código-Fonte Completo Atualizado (HTML + CSS + JS)

Substitua o conteúdo do seu arquivo atual por este código completo:
html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#102d46">
<title>BravoBeach PDV · Estoque Integrado</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#f0f6f8;color:#102d46;font-family:Arial,sans-serif}
header{background:#102d46;color:white;padding:22px;display:flex;justify-content:between;align-items:center}
header h1{margin:0;font-size:24px}
header p{color:#bfe9e7;margin:4px 0 0 0;font-size:14px}
main{max-width:900px;margin:auto;padding:16px}
nav{display:flex;gap:8px;margin-bottom:14px}
nav button{flex:1;background:#dcebea;color:#102d46;border:0;padding:12px;border-radius:8px;font-weight:bold;cursor:pointer;font-size:15px}
nav button.active{background:#13a89e;color:white}
.card{background:white;border-radius:14px;padding:18px;margin-bottom:14px;box-shadow:0 2px 5px rgba(0,0,0,0.05)}
h2{margin-top:0;color:#102d46;border-bottom:2px solid #f0f6f8;padding-bottom:8px}
label{display:block;font-size:13px;font-weight:bold;margin:12px 0 5px}
input,select,button{width:100%;padding:12px;border-radius:8px;font-size:16px}
input,select{border:1px solid #dce7eb;background:white;outline:none}
input:focus,select:focus{border-color:#13a89e}
button{border:0;background:#13a89e;color:white;font-weight:bold;cursor:pointer;transition:all 0.2s}
button:hover{opacity:0.9}
button.secondary{background:#708492}
button.danger{background:#e74c3c}

/* Grid de Mesas */
.grid-mesas{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:12px;margin-top:14px}
.mesa-btn{aspect-ratio:1;border:0;border-radius:12px;font-weight:bold;font-size:16px;color:white;display:flex;flex-direction:column;justify-content:center;align-items:center;cursor:pointer;box-shadow:0 4px 6px rgba(0,0,0,0.05)}
.mesa-btn.livre{background:#2ecc71}
.mesa-btn.ocupada{background:#e74c3c}
.mesa-btn span{font-size:11px;font-weight:normal;margin-top:4px;opacity:0.9}

/* Layout do Painel de Atendimento */
.atendimento-container{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:768px){.atendimento-container{grid-template-columns:1fr}}

/* Abas de Categorias de Produtos */
.abas-produtos{display:flex;gap:4px;margin-bottom:10px;background:#f0f6f8;padding:4px;border-radius:8px}
.aba-cat{padding:8px;font-size:13px;background:none;color:#708492;flex:1;border-radius:6px;margin:0}
.aba-cat.active{background:white;color:#102d46;box-shadow:0 2px 4px rgba(0,0,0,0.05)}
.grid-produtos-botoes{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;max-height:300px;overflow-y:auto;padding:4px;background:#f9fbfc;border:1px solid #dce7eb;border-radius:8px}
.prod-item-btn{background:white;border:1px solid #dce7eb;border-radius:8px;padding:10px;text-align:center;height:100%;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer}
.prod-item-btn:hover{border-color:#13a89e;background:#f0faf9}
.prod-item-btn.esgotado{background:#f0f2f5;border-color:#dce7eb;cursor:not-allowed;opacity:0.6}
.prod-item-btn.esgotado:hover{background:#f0f2f5;border-color:#dce7eb}
.prod-item-btn strong{font-size:13px;display:block;margin-bottom:4px;color:#102d46}
.prod-item-btn span{font-size:12px;color:#13a89e;font-weight:bold}
.prod-item-btn small{font-size:11px;color:#708492;margin-top:4px}

/* Itens da Conta / Consumo */
.item-consumo{display:flex;justify-content:between;align-items:center;padding:8px 0;border-bottom:1px dashed #dce7eb}
.item-consumo:last-child{border:0}
.item-info{flex:1}
.item-remove{width:auto;padding:4px 8px;font-size:12px;margin:0}

/* Tabelas e Listas */
table{width:100%;border-collapse:collapse;margin-top:10px}
th,td{text-align:left;padding:10px;border-bottom:1px solid #dce7eb}
th{background:#f0f6f8;font-size:13px}
</style>
</head>
<body>

<header>
<div>
<h1>🌊 BravoBeach</h1>
<p>PDV · Gestão de Quiosque & Mesas com Controle de Estoque</p>
</div>
</header>

<main>
<nav>
<button id="nav-mapa" class="active" onclick="mudarAba('mapa')">🗺️ Mapa de Mesas</button>
<button id="nav-config" onclick="mudarAba('config')">⚙️ Configurações</button>
</nav>

<!-- ABA 1: MAPA DE MESAS -->
<section id="sec-mapa">
<div class="card">
<h2>Mapa de Mesas</h2>
<div class="grid-mesas" id="container-mesas"></div>
</div>

<!-- Janela de Atendimento da Mesa Selecionada -->
<div id="painel-atendimento" class="card" style="display:none">
<h2 id="atendimento-titulo">Atendimento - Mesa X</h2>
<div class="atendimento-container">
<!-- Lado Esquerdo: Lançamento de Itens -->
<div>
<h3>Cardápio (Adicionar Itens)</h3>
<label>Selecione o Garçom</label>
<select id="atend-garcom" onchange="atualizarDadosMesa()"></select>

<label>Produtos por Categoria</label>
<div class="abas-produtos">
<button class="aba-cat active" id="btn-cat-petiscos" onclick="filtrarProdutosMenu('petiscos')">Petiscos</button>
<button class="aba-cat" id="btn-cat-drinks" onclick="filtrarProdutosMenu('drinks')">Drinks</button>
<button class="aba-cat" id="btn-cat-pratos" onclick="filtrarProdutosMenu('pratos')">Pratos</button>
<button class="aba-cat" id="btn-cat-sem-alcool" onclick="filtrarProdutosMenu('sem alcool')">Sem Álcool</button>
</div>

<div class="grid-produtos-botoes" id="menu-produtos-botoes">
<!-- Botões gerados via JS -->
</div>
<button type="button" class="danger" style="margin-top:20px" onclick="cancelarMesaInteira()">🚫 Cancelar/Zerar Mesa</button>
</div>

<!-- Lado Direito: Extrato e Fechamento -->
<div style="background:#f9fbfc; padding:14px; border-radius:10px; border:1px solid #dce7eb">
<h3>Consumo Atual</h3>
<div id="consumo-lista" style="max-height:200px; overflow-y:auto; margin-bottom:12px"></div>

<hr style="border:0; border-top:1px solid #dce7eb; margin:12px 0">
<div style="display:flex; justify-content:space-between; font-weight:bold; font-size:18px; margin-bottom:12px">
<span>Subtotal:</span>
<span id="atend-subtotal">R$ 0,00</span>
</div>

<h3>Fechamento de Conta</h3>
<label>Taxa de Serviço (%)</label>
<input type="number" id="atend-taxa" value="10" min="0" oninput="calcularTotalFechamento()">

<label>Desconto (R$)</label>
<input type="number" id="atend-desconto" value="0" min="0" step="0.01" oninput="calcularTotalFechamento()">

<label id="label-motivo">Motivo do Desconto (Obrigatório se houver desconto)</label>
<input type="text" id="atend-motivo" placeholder="Ex: Cortesia da casa / Erro cozinha">

<label>Forma de Pagamento</label>
<select id="atend-pagamento">
<option value="Dinheiro">Dinheiro</option>
<option value="Pix">Pix</option>
<option value="Débito">Cartão de Débito</option>
<option value="Crédito">Cartão de Crédito</option>
</select>

<div style="display:flex; justify-content:space-between; font-weight:bold; font-size:20px; color:#13a89e; margin:16px 0">
<span>Total Geral:</span>
<span id="atend-total">R$ 0,00</span>
</div>

<button type="button" style="background:#2ecc71" onclick="fecharMesaConta()">💰 Confirmar e Fechar Mesa</button>
<button type="button" class="secondary" style="margin-top:8px" onclick="fecharPainelAtendimento()">Fechar Painel</button>
</div>
</div>
</div>
</section>

<!-- ABA 2: CONFIGURAÇÕES -->
<section id="sec-config" style="display:none">
<!-- Senha do Sistema -->
<div class="card">
<h2>Segurança</h2>
<label>Senha Master de Cancelamento</label>
<input type="password" id="cfg-senha" value="240325">
<button onclick="salvarSenha()" style="margin-top:8px">Salvar Nova Senha</button>
</div>

<!-- Cadastro de Garçons -->
<div class="card">
<h2>Gerenciar Garçons</h2>
<form id="form-garcom" onsubmit="event.preventDefault(); cadastrarGarcom();">
<label>Nome do Garçom</label>
<input id="new-garcom" required placeholder="Ex: João Silva">
<button type="submit">Adicionar Garçom</button>
</form>
<table>
<thead><tr><th>Nome</th><th>Ações</th></tr></thead>
<tbody id="tbl-garcons"></tbody>
</table>
</div>

<!-- Cadastro de Produtos -->
<div class="card">
<h2>Gerenciar Produtos e Estoque</h2>
<form id="form-produto" onsubmit="event.preventDefault(); cadastrarProduto();">
<label>Nome do Produto</label>
<input id="new-prod-nome" required placeholder="Ex: Cerveja Long Neck">
<label>Categoria</label>
<select id="new-prod-cat">
<option value="petiscos">Petiscos</option>
<option value="drinks">Drinks</option>
<option value="pratos">Pratos</option>
<option value="sem alcool">Sem Álcool</option>
</select>
<label>Preço Unitário (R$)</label>
<input id="new-prod-preco" type="number" min="0" step="0.01" required placeholder="12.00">
<label>Quantidade Inicial em Estoque</label>
<input id="new-prod-estoque" type="number" min="0" value="50" required placeholder="Ex: 50">
<button type="submit">Adicionar Produto</button>
</form>
<table>
<thead><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th>Ações</th></tr></thead>
<tbody id="tbl-produtos"></tbody>
</table>
</div>

<!-- Reset de Dados -->
<div class="card">
<h2>Configurações do Layout</h2>
<label>Quantidade de Mesas no Salão</label>
<input type="number" id="cfg-qtd-mesas" value="15" min="1">
<button onclick="configurarQuantidadeMesas()" style="margin-top:8px">Atualizar Quantidade de Mesas</button>
</div>
</section>
</main>

<script>
// Banco de Dados no LocalStorage
const DB_PREFIX = "bravobeach_v3_";
let config = JSON.parse(localStorage.getItem(DB_PREFIX + "config") || '{"senha":"240325","qtdMesas":15}');
let garcons = JSON.parse(localStorage.getItem(DB_PREFIX + "garcons") || '["Carlos","Ana","Bruno"]');
let produtos = JSON.parse(localStorage.getItem(DB_PREFIX + "produtos") || '[{"id":"1","nome":"Água de Coco","categoria":"sem alcool","preco":10,"estoque":30},{"id":"2","nome":"Caipirinha","categoria":"drinks","preco":22,"estoque":15},{"id":"3","nome":"Isca de Peixe","categoria":"petiscos","preco":65,"estoque":999},{"id":"4","nome":"PF de Frango","categoria":"pratos","preco":38,"estoque":999}]');
let mesasAtivas = JSON.parse(localStorage.getItem(DB_PREFIX + "mesasAtivas") || '{}');

let mesaSelecionadaAtual = null;
Use o código com cuidado.
let categoriaMenuAtual = "petiscos";
const formatarDinheiro = n => Number(n).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
window.onload = function() {
renderizarAbasEGrid();
renderizarGarcons();
renderizarProdutos();
atualizarSelectGarcons();
};
function mudarAba(aba) {
document.getElementById("sec-mapa").style.display = aba === 'mapa' ? 'block' : 'none';
document.getElementById("sec-config").style.display = aba === 'config' ? 'block' : 'none';
document.getElementById("nav-mapa").classList.toggle("active", aba === 'mapa');
document.getElementById("nav-config").classList.toggle("active", aba === 'config');
if(aba === 'config') renderizarProdutos();
}
function renderizarAbasEGrid() {
const container = document.getElementById("container-mesas");
container.innerHTML = "";
for (let i = 1; i <= config.qtdMesas; i++) {
const mesa = mesasAtivas[i];
const btn = document.createElement("button");
btn.className = mesa-btn ${mesa ? 'ocupada' : 'livre'};
let totalItens = 0;
if (mesa && mesa.itens) {
totalItens = mesa.itens.reduce((acc, curr) => acc + curr.qtd, 0);
}
btn.innerHTML = Mesa ${i} <span>${mesa ? Ocupada (${totalItens} itens) : 'Disponível'}</span>;
btn.onclick = () => abrirAtendimentoMesa(i);
container.appendChild(btn);
}
}
function abrirAtendimentoMesa(numeroMesa) {
mesaSelecionadaAtual = numeroMesa;
document.getElementById("atendimento-titulo").textContent = Atendimento - Mesa ${numeroMesa};
document.getElementById("painel-atendimento").style.display = "block";
if (!mesasAtivas[numeroMesa]) {
mesasAtivas[numeroMesa] = { garcom: garcons[0] || "", itens: [] };
}
document.getElementById("atend-garcom").value = mesasAtivas[numeroMesa].garcom;
document.getElementById("atend-taxa").value = 10;
document.getElementById("atend-desconto").value = 0;
document.getElementById("atend-motivo").value = "";
filtrarProdutosMenu(categoriaMenuAtual);
atualizarConsumoMesaInterface();
document.getElementById("painel-atendimento").scrollIntoView({ behavior: 'smooth' });
}
function fecharPainelAtendimento() {
if (mesasAtivas[mesaSelecionadaAtual] && mesasAtivas[mesaSelecionadaAtual].itens.length === 0) {
delete mesasAtivas[mesaSelecionadaAtual];
localStorage.setItem(DB_PREFIX + "mesasAtivas", JSON.stringify(mesasAtivas));
}
document.getElementById("painel-atendimento").style.display = "none";
mesaSelecionadaAtual = null;
renderizarAbasEGrid();
}
function atualizarDadosMesa() {
if(!mesaSelecionadaAtual) return;
mesasAtivas[mesaSelecionadaAtual].garcom = document.getElementById("atend-garcom").value;
localStorage.setItem(DB_PREFIX + "mesasAtivas", JSON.stringify(mesasAtivas));
}
function filtrarProdutosMenu(categoria) {
categoriaMenuAtual = categoria;
document.querySelectorAll(".aba-cat").forEach(btn => btn.classList.remove("active"));
if(categoria === 'petiscos') document.getElementById("btn-cat-petiscos").classList.add("active");
if(categoria === 'drinks') document.getElementById("btn-cat-drinks").classList.add("active");
if(categoria === 'pratos') document.getElementById("btn-cat-pratos").classList.add("active");
if(categoria === 'sem alcool') document.getElementById("btn-cat-sem-alcool").classList.add("active");
const containerBotoes = document.getElementById("menu-produtos-botoes");
containerBotoes.innerHTML = "";
const produtosFiltrados = produtos.filter(p => p.categoria === categoria);
if(produtosFiltrados.length === 0) {
containerBotoes.innerHTML = <div style="grid-column: 1/-1; padding: 20px; text-align:center; color:#708492">Nenhum produto cadastrado.</div>;
return;
}
produtosFiltrados.forEach(prod => {
const btnProd = document.createElement("div");
const isEsgotado = prod.estoque <= 0;
btnProd.className = prod-item-btn ${isEsgotado ? 'esgotado' : ''};
btnProd.innerHTML = <strong>${prod.nome}</strong> <span>${formatarDinheiro(prod.preco)}</span> <small>${isEsgotado ? '❌ (Esgotado)' :Estoque: ${prod.estoque} un}</small> ;
if(!isEsgotado) {
btnProd.onclick = () => adicionarItemMesa(prod);
}
containerBotoes.appendChild(btnProd);
});
}
function adicionarItemMesa(produtoRef) {
if (!mesaSelecionadaAtual) return;
// Localizar o produto no estoque para dar baixa
let prodEstoque = produtos.find(p => p.id === produtoRef.id);
if (!prodEstoque || prodEstoque.estoque <= 0) {
alert("Produto sem estoque suficiente!");
return;
}
let mesa = mesasAtivas[mesaSelecionadaAtual];
let itemExistente = mesa.itens.find(i => i.id === produtoRef.id);
// Decrementa o estoque real
prodEstoque.estoque -= 1;
localStorage.setItem(DB_PREFIX + "produtos", JSON.stringify(produtos));
if (itemExistente) {
itemExistente.qtd += 1;
itemExistente.total = itemExistente.qtd * itemExistente.preco;
} else {
mesa.itens.push({
id: produtoRef.id,
nome: produtoRef.nome,
preco: produtoRef.preco,
qtd: 1,
total: produtoRef.preco
});
}
localStorage.setItem(DB_PREFIX + "mesasAtivas", JSON.stringify(mesasAtivas));
atualizarConsumoMesaInterface();
filtrarProdutosMenu(categoriaMenuAtual);
}
function removerItemMesa(idProduto) {
const senhaDigitada = prompt("Digite a senha de segurança para estornar o item:");
if (senhaDigitada !== config.senha) {
alert("Senha incorreta! Operação cancelada.");
return;
}
let mesa = mesasAtivas[mesaSelecionadaAtual];
let itemIndex = mesa.itens.findIndex(i => i.id === idProduto);
if (itemIndex > -1) {
// Devolve 1 unidade para o estoque
let prodEstoque = produtos.find(p => p.id === idProduto);
if(prodEstoque) prodEstoque.estoque += 1;
localStorage.setItem(DB_PREFIX + "produtos", JSON.stringify(produtos));
if(mesa.itens[itemIndex].qtd > 1) {
mesa.itens[itemIndex].qtd -= 1;
mesa.itens[itemIndex].total = mesa.itens[itemIndex].qtd * mesa.itens[itemIndex].preco;
} else {
mesa.itens.splice(itemIndex, 1);
}
}
localStorage.setItem(DB_PREFIX + "mesasAtivas", JSON.stringify(mesasAtivas));
atualizarConsumoMesaInterface();
filtrarProdutosMenu(categoriaMenuAtual);
}
function cancelarMesaInteira() {
const senhaDigitada = prompt("ATENÇÃO: Isso limpará todo o consumo e retornará os itens ao estoque!\nDigite a senha:");
if (senhaDigitada !== config.senha) {
alert("Senha incorreta!");
return;
}
let mesa = mesasAtivas[mesaSelecionadaAtual];
if (mesa && mesa.itens) {
// Devolve todos os itens para o estoque antes de apagar
mesa.itens.forEach(item => {
let prodEstoque = produtos.find(p => p.id === item.id);
if (prodEstoque) prodEstoque.estoque += item.qtd;
});
localStorage.setItem(DB_PREFIX + "produtos", JSON.stringify(produtos));
}
delete mesasAtivas[mesaSelecionadaAtual];
localStorage.setItem(DB_PREFIX + "mesasAtivas", JSON.stringify(mesasAtivas));
alert("Mesa cancelada e itens retornados ao estoque.");
fecharPainelAtendimento();
}
function atualizarConsumoMesaInterface() {
const lista = document.getElementById("consumo-lista");
lista.innerHTML = "";
let mesa = mesasAtivas[mesaSelecionadaAtual];
if (!mesa || mesa.itens.length === 0) {
lista.innerHTML = "Mesa vazia.";
document.getElementById("atend-subtotal").textContent = "R$ 0,00";
document.getElementById("atend-total").textContent = "R$ 0,00";
return;
}
let subtotal = 0;
mesa.itens.forEach(item => {
subtotal += item.total;
const div = document.createElement("div");
div.className = "item-consumo";
div.innerHTML = <div class="item-info"> <strong>${item.nome}</strong><br> <small>${item.qtd}x de ${formatarDinheiro(item.preco)}</small> </div> <strong style="margin-right:10px">${formatarDinheiro(item.total)}</strong> <button class="danger item-remove" onclick="removerItemMesa('${item.id}')">❌</button>;
lista.appendChild(div);
});
document.getElementById("atend-subtotal").textContent = formatarDinheiro(subtotal);
calcularTotalFechamento();
}
function calcularTotalFechamento() {
let mesa = mesasAtivas[mesaSelecionadaAtual];
if (!mesa) return;
let subtotal = mesa.itens.reduce((acc, curr) => acc + curr.total, 0);
let taxaPorcentagem = Number(document.getElementById("atend-taxa").value) || 0;
let descontoValor = Number(document.getElementById("atend-desconto").value) || 0;
let valorTaxa = subtotal * (taxaPorcentagem / 100);
let totalGeral = subtotal + valorTaxa - descontoValor;
if (totalGeral < 0) totalGeral = 0;
document.getElementById("atend-total").textContent = formatarDinheiro(totalGeral);
}
function fecharMesaConta() {
let mesa = mesasAtivas[mesaSelecionadaAtual];
if(!mesa || mesa.itens.length === 0) {
alert("Mesa vazia.");
return;
}
let descontoValor = Number(document.getElementById("atend-desconto").value) || 0;
let motivo = document.getElementById("atend-motivo").value.trim();
if (descontoValor > 0 && motivo === "") {
alert("ERRO: É obrigatório informar o Motivo do Desconto!");
document.getElementById("atend-motivo").focus();
return;
}
alert(Conta da Mesa ${mesaSelecionadaAtual} fechada!\nForma: ${document.getElementById("atend-pagamento").value});
delete mesasAtivas[mesaSelecionadaAtual];
localStorage.setItem(DB_PREFIX + "mesasAtivas", JSON.stringify(mesasAtivas));
fecharPainelAtendimento();
}
/* --- SEÇÃO CONFIGURAÇÕES --- */
function salvarSenha() {
config.senha = document.getElementById("cfg-senha").value;
localStorage.setItem(DB_PREFIX + "config", JSON.stringify(config));
alert("Senha administrativa salva!");
}
function configurarQuantidadeMesas() {
config.qtdMesas = Number(document.getElementById("cfg-qtd-mesas").value) || 15;
localStorage.setItem(DB_PREFIX + "config", JSON.stringify(config));
renderizarAbasEGrid();
alert("Mesas atualizadas.");
}
function renderizarGarcons() {
const tbody = document.getElementById("tbl-garcons");
tbody.innerHTML = "";
garcons.forEach((g, idx) => {
tbody.innerHTML += `
${g}
Excluir
`;
});
}
function cadastrarGarcom() {
const nome = document.getElementById("new-garcom").value.trim();
if(!nome) return;
garcons.push(nome);
localStorage.setItem(DB_PREFIX + "garcons", JSON.stringify(garcons));
document.getElementById("new-garcom").value = "";
renderizarGarcons();
atualizarSelectGarcons();
}
function removerGarcom(idx) {
garcons.splice(idx, 1);
localStorage.setItem(DB_PREFIX + "garcons", JSON.stringify(garcons));
renderizarGarcons();
atualizarSelectGarcons();
}
function atualizarSelectGarcons() {
const sel = document.getElementById("atend-garcom");
if(!sel) return;
sel.innerHTML = "";
garcons.forEach(g => {
sel.innerHTML += <option value="${g}">${g}</option>;
});
}
function renderizarProdutos() {
const tbody = document.getElementById("tbl-produtos");
tbody.innerHTML = "";
produtos.forEach((p) => {
tbody.innerHTML += `
${p.nome}
${p.categoria}
${formatarDinheiro(p.preco)}
${p.estoque} un
Excluir
`;
});
}
function cadastrarProduto() {
const nome = document.getElementById("new-prod-nome").value.trim();
const categoria = document.getElementById("new-prod-cat").value;
const preco = Number(document.getElementById("new-prod-preco").value) || 0;
const estoque = Number(document.getElementById("new-prod-estoque").value) || 0;
if(!nome || preco <= 0) {
alert("Preencha os campos corretamente.");
return;
}
produtos.push({
id: String(Date.now()),
nome,
categoria,
preco,
estoque
});
localStorage.setItem(DB_PREFIX + "produtos", JSON.stringify(produtos));
document.getElementById("new-prod-nome").value = "";
document.getElementById("new-prod-preco").value = "";
document.getElementById("new-prod-estoque").value = "50";
renderizarProdutos();
if(mesaSelecionadaAtual) filtrarProdutosMenu(categoriaMenuAtual);
}
function removerProduto(id) {
produtos = produtos.filter(p => p.id !== id);
localStorage.setItem(DB_PREFIX + "produtos", JSON.stringify(produtos));
renderizarProdutos();
if(mesaSelecionadaAtual) filtrarProdutosMenu(categoriaMenuAtual);
}



---

### 📉 Resumo do Fluxo do Estoque

| Evento / Ação Realizada | Impacto no Painel da Mesa | Mudança no Banco (Estoque) |
| :--- | :--- | :--- |
| **Lançar Bebida na Mesa** | Exibe item no extrato da mesa | **Reduz 1 unidade** do produto |
| **Bebida chega a 0 un.** | Botão fica cinza e diz **(Esgotado)** | **Bloqueia novos cliques** |
| **Estornar Item (Senha)** | Remove a unidade do extrato | **Devolve 1 unidade** ao estoque |
| **Zerar/Cancelar Mesa** | Mesa volta a ficar Verde (Livre) | **Devolve todos os itens** da mesa ao estoque |

<FollowUp>
Para deixar ainda melhor, gostaria que o sistema gerasse um **Aviso Visual em Amarelo** quando o estoque de uma bebida estivesse com menos de 5 unidades (Estoque Crítico)? Me avise para ajustarmos!
</FollowUp>
