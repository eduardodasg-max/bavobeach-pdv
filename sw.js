<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>🌊 BravoBeach OS · PDV Profissional</title>
<style>
:root{--bg:#f4f7f6;--surface:#ffffff;--text:#0f2942;--primary:#10b981;--primary-hover:#059669;--danger:#ef4444;--danger-hover:#dc2626;--warning:#f59e0b;--border:#e2e8f0;--muted:#64748b;--radius:12px}
*{box-sizing:border-box;margin:0;padding:0;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif}
body{background:var(--bg);color:var(--text);padding-bottom:60px}
header{background:#0f2942;color:#fff;padding:20px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 4px 12px rgba(0,0,0,0.1)}
header h1{font-size:22px;display:flex;align-items:center;gap:8px}
header p{color:#a7f3d0;font-size:12px;margin-top:2px}
.container{max-width:1200px;margin:20px auto;padding:0 16px}
nav{display:flex;gap:10px;margin-bottom:20px;background:#e2e8f0;padding:6px;border-radius:var(--radius)}
nav button{flex:1;border:0;padding:12px;border-radius:8px;font-weight:bold;cursor:pointer;background:none;color:var(--muted);transition:all 0.2s;font-size:14px}
nav button.active{background:var(--surface);color:#0f2942;box-shadow:0 4px 6px rgba(0,0,0,0.05)}
.card{background:var(--surface);border-radius:var(--radius);padding:20px;margin-bottom:20px;box-shadow:0 4px 6px rgba(0,0,0,0.02);border:1px solid var(--border)}
h2{font-size:18px;margin-bottom:16px;display:flex;align-items:center;gap:8px;border-bottom:2px solid var(--bg);padding-bottom:10px}
label{display:block;font-size:12px;font-weight:700;text-transform:uppercase;color:var(--muted);margin:14px 0 6px}
input,select,button{width:100%;padding:12px;border-radius:8px;font-size:15px;transition:all 0.2s}
input,select{border:1px solid var(--border);background:var(--surface);color:var(--text);outline:none}
input:focus,select:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(16,185,129,0.1)}
button{border:0;background:var(--primary);color:#fff;font-weight:bold;cursor:pointer}
button:hover{background:var(--primary-hover)}
button.sec{background:#64748b}button.sec:hover{background:#475569}
button.dan{background:var(--danger)}button.dan:hover{background:var(--danger-hover)}

/* Grid Mesas */
.grid-mesas{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:12px}
.mesa-card{aspect-ratio:1;border:2px solid var(--border);border-radius:var(--radius);background:var(--surface);cursor:pointer;display:flex;flex-direction:column;justify-content:center;align-items:center;font-weight:bold;position:relative;transition:all 0.2s;box-shadow:0 2px 4px rgba(0,0,0,0.02)}
.mesa-card:hover{transform:translateY(-2px);box-shadow:0 6px 12px rgba(0,0,0,0.05)}
.mesa-card.livre{border-top:6px solid #10b981}
.mesa-card.livre .status-dot{background:#10b981}
.mesa-card.ocupada{border-top:6px solid #ef4444;background:#fff5f5}
.mesa-card.ocupada .status-dot{background:#ef4444}
.mesa-card h3{font-size:18px;margin-bottom:4px}
.mesa-card span{font-size:12px;color:var(--muted);font-weight:500}
.status-dot{width:8px;height:8px;border-radius:50%;position:absolute;top:10px;right:10px}

/* Atendimento */
.workspace{display:grid;grid-template-columns:1.2fr 0.8fr;gap:20px}
@media(max-width:900px){.workspace{grid-template-columns:1fr}}
.cat-scroll{display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:15px}
.cat-btn{width:auto;white-space:nowrap;padding:8px 16px;background:#e2e8f0;color:var(--text);border-radius:20px;font-size:13px}
.cat-btn.active{background:#0f2942;color:#fff}
.grid-menu{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;max-height:360px;overflow-y:auto;padding-right:4px}
.prod-btn{background:var(--surface);border:1px solid var(--border);padding:12px;border-radius:10px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;text-align:center;height:100px}
.prod-btn:hover{border-color:var(--primary);background:rgba(16,185,129,0.02)}
.prod-btn strong{font-size:13px;color:var(--text);line-height:1.2;margin-bottom:4px}
.prod-btn .p-price{color:var(--primary);font-weight:700;font-size:14px}
.prod-btn .p-stock{font-size:10px;font-weight:bold;margin-top:2px;padding:2px;border-radius:4px}
.p-stock.normal{color:var(--muted);background:#f1f5f9}
.p-stock.low{color:#b45309;background:#fef3c7}
.p-stock.empty{color:#b91c1c;background:#fee2e2}
.prod-btn.disabled{opacity:0.5;cursor:not-allowed}

/* Extrato de Conta */
.ticket{background:#f8fafc;border:1px dashed var(--border);border-radius:8px;padding:15px;font-family:monospace;font-size:13px}
.ticket-row{display:flex;justify-content:space-between;margin-bottom:6px;border-bottom:1px dotted #e2e8f0;padding-bottom:4px}
.totals-box{background:#f1f5f9;padding:12px;border-radius:8px;margin-top:15px}
.totals-row{display:flex;justify-content:space-between;font-size:14px;margin-bottom:6px}
.totals-row.final{font-size:18px;font-weight:bold;color:var(--primary);border-top:2px solid var(--border);padding-top:8px;margin-top:6px}

/* Tabelas */
.table-wrapper{overflow-x:auto}
table{width:100%;border-collapse:collapse;margin-top:10px;font-size:14px}
th,td{padding:12px;text-align:left;border-bottom:1px solid var(--border)}
th{background:#f1f5f9;color:var(--muted);font-weight:600}

/* Dashboard Stats */
.dashboard-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:15px;margin-bottom:20px}
.stat-card{background:var(--surface);padding:20px;border-radius:var(--radius);border:1px solid var(--border);display:flex;flex-direction:column}
.stat-card span{font-size:12px;color:var(--muted);font-weight:600;text-transform:uppercase}
.stat-card strong{font-size:24px;margin-top:5px;color:#0f2942}

/* Tela de Impressão Cupom */
@media print{body *{visibility:hidden}#print-section,#print-section *{visibility:visible}#print-section{position:absolute;left:0;top:0;width:80mm;font-family:monospace;font-size:12px;color:#000;background:#fff;padding:10px}}
</style>
</head>
<body>

<header>
<div>
<h1>🌊 BravoBeach OS</h1>
<p>Sistema de Gestão & Automação de Quiosques v1.0</p>
</div>
<div style="text-align:right"><strong id="live-clock">00:00:00</strong></div>
</header>

<div class="container">
<nav>
<button id="tab-mapa" class="active" onclick="switchView('mapa')">🗺️ Salão de Mesas</button>
<button id="tab-dash" onclick="switchView('dash')">📊 Painel Financeiro</button>
<button id="tab-config" onclick="switchView('config')">⚙️ Ajustes & Cadastros</button>
</nav>

<!-- VISÃO 1: MAPA DE MESAS -->
<section id="view-mapa">
<div class="card">
<h2>Mapa de Atendimento Corrente</h2>
<div class="grid-mesas" id="grid-mesas-target"></div>
</div>

<div class="card" id="panel-atendimento" style="display:none">
<h2 id="atend-title">Atendimento - Mesa 00</h2>
<div class="workspace">
<!-- Cardápio Interativo -->
<div>
<h3>Lançamento Rápido</h3>
<label>Responsável Pelo Atendimento</label>
<select id="atend-garcom" onchange="persistCurrentMesaState()"></select>

<label>Filtro por Categorias</label>
<div class="cat-scroll" id="cat-scroll-target"></div>

<div class="grid-menu" id="menu-items-target"></div>
<button type="button" class="dan" style="margin-top:25px" onclick="purgeMesaAction()">🚫 Cancelar/Estornar Mesa Inteira</button>
</div>

<!-- Extrato Financeiro Direto -->
<div>
<div style="background:#fff;padding:15px;border-radius:10px;border:1px solid var(--border)">
<h3>Extrato e Checkout</h3>
<label>Itens da Conta</label>
<div id="ticket-items-target" class="ticket"></div>

<div class="totals-box">
<div class="totals-row"><span>Subtotal dos Itens:</span><strong id="out-subtotal">R$ 0,00</strong></div>
<div class="totals-row"><span style="display:flex;align-items:center;gap:4px">Taxa de Serviço (%): <input type="number" id="inp-taxa" value="10" min="0" style="width:60px;padding:4px;margin:0" oninput="calculateCheckoutTotals()"></span></div>
<div class="totals-row"><span style="display:flex;align-items:center;gap:4px">Desconto Aplicado (R$): <input type="number" id="inp-desconto" value="0" min="0" step="0.01" style="width:80px;padding:4px;margin:0" oninput="calculateCheckoutTotals()"></span></div>
<div class="totals-row" id="row-motivo-box" style="display:none;flex-direction:column;gap:4px"><span style="color:var(--danger);font-weight:bold">Motivo do Desconto:</span><input type="text" id="inp-motivo" placeholder="Ex: Prato demorou / Cortesia gerente"></div>
<div class="totals-row final"><span>Total Líquido:</span><strong id="out-total-geral">R$ 0,00</strong></div>
</div>

<label>Forma de Liquidação</label>
<select id="inp-method">
<option value="Dinheiro">Dinheiro 💵</option>
<option value="Pix">Transferência Pix ⚡</option>
<option value="Débito">Cartão de Débito 💳</option>
<option value="Crédito">Cartão de Crédito 💳</option>
</select>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:15px">
<button type="button" style="background:#0f2942" onclick="printReceiptAction()">🖨️ Cupom</button>
<button type="button" style="background:var(--primary)" onclick="finalizeMesaPayment()">💰 Fechar Conta</button>
</div>
<button type="button" class="sec" style="margin-top:8px" onclick="closeAtendimentoPanel()">Esconder Painel</button>
</div>
</div>
</div>
</div>
</section>

<!-- VISÃO 2: DASHBOARD FINANCEIRO -->
<section id="view-dash" style="display:none">
<div class="dashboard-grid">
<div class="stat-card"><span>Faturamento Total</span><strong id="dash-faturamento">R$ 0,00</strong></div>
<div class="stat-card"><span>Atendimentos Concluídos</span><strong id="dash-pedidos-qtd">0</strong></div>
<div class="stat-card"><span>Descontos Concedidos</span><strong id="dash-descontos-total" style="color:var(--danger)">R$ 0,00</strong></div>
</div>

<div class="card">
<h2>Relatório Estatístico por Pagamento</h2>
<div class="table-wrapper">
<table>
<thead><tr><th>Método</th><th>Volume Comercializado</th></tr></thead>
<tbody>
<tr><td>Dinheiro</td><td id="m-dinheiro">R$ 0,00</td></tr>
