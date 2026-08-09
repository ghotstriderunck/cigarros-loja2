// ========================================
// CIGARROS LOJA - JAVASCRIPT
// ========================================

// ARMAZENAMENTO LOCAL
let vendas = JSON.parse(localStorage.getItem('vendas_cigarros')) || [];

const precosPorMarca = {

    "Carlton Red": 175.00,
    "Carlton blue": 175.00,
    "Evoque Tabaco": 180.00,
    "Double Refresh": 175.00,
    "Mix Refresh": 175.00,
    "Ice Refresh": 175.00,
    "Evoque Essence": 175.00,
    "Free Red": 150.00,
    "Free Blue": 150.00,
    "Full Red": 150.00,
    "Lucky Strike Ori. Red": 150.00,
    "Lucky Strike Ori. Blue": 150.00,
    "R.A Patterson Red": 117.50,
    "R.A Patterson Blue": 117.50,
    "Fresh Mint X": 159.00,
    "Double Ice": 159.00,
    "Fresh Wild": 159.00,
    "Fresh Ice": 159.00,
    "Rothmans Ori. Blue": 133.00,
    "Rothmans Ori. Red": 133.00,
    "Rothmans Ori. Silver": 133.00,
    "Rothmans Internacional": 147.00,
    "Rothmans Global Blue": 120.00,
    "Rothmans Global Red": 120.00,
    "Kent Blue": 158.00,
    "Kent Red": 158.00,
    "Kent Silver": 158.00,
    "Harmony": 145.00,
    "Marlboro Gold selection": 125.00,
    "Marlboro Blue selection": 125.00,
    "Marlboro red selection": 125.00,
    "Marlboro Red": 170.00,
    "Marlboro Gold": 170.00,
    "Marlboro vista": 150.00,
    "Marlboro Ice": 150.00,
    "Marlboro Double Mix": 150.00,
    "Marlboro Double Fusion": 150.00,
    "Marlboro Vista": 150.00,
    "Camel Filters": 128.00,
    "Camel Blue": 128.00,
    "Camel Double Mint & Purple": 170.00,
    "Black Kretek Menthol": 230.00,
    "Black Kretek": 230.00,
    "Gudang": 275.00,
    "Winston Blue": 115.00,
    "Winston Red": 115.00,
    "Winston Silver": 115.00,
    "Winston P. Mint": 145.00,
    "Winston Classic": 115.00,

};

function preencherPreco() {
    const marca = document.getElementById('marca').value;
    const preco = document.getElementById('preco');

    if (precosPorMarca[marca]) {
        preco.value = precosPorMarca[marca].toFixed(2);
    } else {
        preco.value = '';
    }
}


// ========================================
// SALVAR DADOS NO CELULAR
// ========================================
function salvar() {
    localStorage.setItem('vendas_cigarros', JSON.stringify(vendas));
}

// ========================================
// ATUALIZAR TABELA + ESTATÍSTICAS
// ========================================
function updateTable() {
    let tbody = document.getElementById('tbody');
    let totalP = 0, totalV = 0;

    tbody.innerHTML = '';

    vendas.forEach((venda, indice) => {
        // Se a venda já foi finalizada, ela não aparece mais na tabela principal
        if (venda.finalizada) {
            return;
        }

        let valorTotal = (venda.qtdpedidos * venda.preco).toFixed(2);
        totalP++;
        totalV += parseFloat(valorTotal);

        let tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${venda.marca}</td>
            <td><strong>${venda.qtdpedidos}</strong></td>
            <td><span class="comprador">${venda.comprador}</span></td>
            <td>R$ ${valorTotal}</td>
            <td class="acoes">
                <button onclick="finalizarVenda(${indice})" class="btn-acao btn-finalizar">
                    ✅
                </button>

                <button onclick="exportLinha(${indice})" class="btn-acao btn-relatorio">
                    💾
                </button>

                <button onclick="deletarLinha(${indice})" class="btn-acao btn-excluir">
                    🗑️
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    document.getElementById('totalP').textContent = totalP;
    document.getElementById('totalV').textContent = 'R$' + totalV.toFixed(2);

    atualizarFinalizadas();
}

    document.getElementById('totalP').textContent = totalP;
    document.getElementById('totalV').textContent = 'R$' + totalV.toFixed(2);

    atualizarFinalizadas();


// ========================================
// FINALIZAR VENDA
// ========================================
function finalizarVenda(indice) {
    let venda = vendas[indice];

    if (!venda) {
        alert('❌ Venda não encontrada!');
        return;
    }

    venda.finalizada = true;
    salvar();
    updateTable();

    alert('✅ Venda finalizada!');
}

// ========================================
// ATUALIZAR VENDAS FINALIZADAS
// ========================================
function atualizarFinalizadas() {
    const area = document.getElementById('vendasFinalizadas');

    if (!area) return;

    const finalizadas = vendas.filter(venda => venda.finalizada);

    if (finalizadas.length === 0) {
        area.innerHTML = 'Nenhuma venda finalizada ainda.';
        return;
    }

    const marcas = {};

    finalizadas.forEach(venda => {
        if (!marcas[venda.marca]) {
            marcas[venda.marca] = {
                totalPedidos: 0,
                totalValor: 0,
                compradores: []
            };
        }

        marcas[venda.marca].totalPedidos += venda.qtdpedidos;
        marcas[venda.marca].totalValor += venda.qtdpedidos * venda.preco;

        marcas[venda.marca].compradores.push({
            nome: venda.comprador,
            qtdpedidos: venda.qtdpedidos,
            total: venda.qtdpedidos * venda.preco
        });
    });

    area.innerHTML = '';

    Object.keys(marcas).forEach(marca => {
        const div = document.createElement('div');
        div.className = 'marca-finalizada';

        const compradoresHTML = marcas[marca].compradores.map(item => {
            return `
                <div class="comprador-finalizado">
                    ${item.nome}: ${item.qtdpedidos} pedidos | R$ ${item.total.toFixed(2)}
                </div>
            `;
        }).join('');

        div.innerHTML = `
            <div class="marca-titulo">${marca}</div>
            <div class="marca-total">Total pedidos: ${marcas[marca].totalPedidos}</div>
            <div class="marca-total">Valor total: R$ ${marcas[marca].totalValor.toFixed(2)}</div>
            ${compradoresHTML}
        `;

        area.appendChild(div);
    });
}


    area.innerHTML = '';

    Object.keys(marcas).forEach(marca => {
        const div = document.createElement('div');
        div.className = 'marca-finalizada';

        const compradoresHTML = marcas[marca].compradores.map(item => {
            return `
                <div class="comprador-finalizado">
                    ${item.nome}: ${item.qtdpedidos} pedidos | R$ ${item.total.toFixed(2)}
                </div>
            `;
        }).join('');

        div.innerHTML = `
            <div class="marca-titulo">${marca}</div>
            <div class="marca-total">Total: ${marcas[marca].totalPedidos} pedidos</div>
            ${compradoresHTML}
        `;

        area.appendChild(div);
    });


// ========================================
// DELETAR UMA LINHA
// ========================================
function deletarLinha(indice) {
    let venda = vendas[indice];

    if (confirm(`🗑️ Excluir?\n${venda.marca} | ${venda.qtdpedidos} pedidos | ${venda.comprador}`)) {
        vendas.splice(indice, 1);
        salvar();
        updateTable();
        alert('✅ Linha excluída!');
    }
}

// ========================================
// ADICIONAR NOVA VENDA
// ========================================
function addCarga() {
    let marca = document.getElementById('marca').value;
    let qtdpedidos = parseInt(document.getElementById('qtdpedidos').value) || 1;
    let comprador = document.getElementById('comprador').value.toUpperCase().trim();
    let preco = parseFloat(document.getElementById('preco').value) || 0;

    if (marca && comprador && preco > 0 && qtdpedidos > 0) {
        vendas.push({
            marca,
            qtdpedidos,
            comprador,
            preco,
            data: new Date().toLocaleDateString('pt-BR'),
            finalizada: false
        });

        salvar();
        updateTable();
        clearForm();
        alert(`✅ ${qtdpedidos}x ${marca} ➡️ ${comprador}`);
    } else {
        alert('❌ Preencha Marca, Comprador, Preço e Qtd!');
    }
}

// ========================================
// LIMPAR FORMULÁRIO
// ========================================
function clearForm() {
    document.getElementById('marca').value = '';
    document.getElementById('qtdpedidos').value = '1';
    document.getElementById('comprador').value = '';
    document.getElementById('preco').value = '';
}

// ========================================
// LIMPAR TODAS VENDAS
// ========================================
function limparTodos() {
    if (confirm('🗑️ APAGAR TODAS VENDAS DO DIA?\n\nNão dá pra desfazer!')) {
        vendas = [];
        salvar();
        updateTable();
        alert('✅ Tabela limpa para amanhã!');
    }
}

// ========================================
// EXPORTAR EXTRATO DO DIA SEPARADO POR MARCA
// ========================================
function exportData() {
    const hoje = new Date().toLocaleDateString('pt-BR');

    if (vendas.length === 0) {
        alert('❌ Não há vendas para exportar!');
        return;
    }

    const marcas = {};

    vendas.forEach(v => {
        if (!marcas[v.marca]) {
            marcas[v.marca] = [];
        }

        marcas[v.marca].push(v);
    });

    let extrato = '';

    Object.keys(marcas).forEach(marca => {
        extrato += `\n===== ${marca} =====\n`;

        marcas[marca].forEach(v => {
            let total = (v.qtdpedidos * v.preco).toFixed(2);
            let status = v.finalizada ? 'FINALIZADA' : 'ABERTA';

            extrato += `${v.data} | ${v.qtdpedidos} pedidos | ${v.comprador} | R$${total} | ${status}\n`;
        });

        const totalMarca = marcas[marca].reduce((sum, v) => sum + (v.qtdpedidos * v.preco), 0);
        const pedidosMarca = marcas[marca].reduce((sum, v) => sum + v.qtdpedidos, 0);

        extrato += `TOTAL ${marca}: R$${totalMarca.toFixed(2)} | ${pedidosMarca} pedidos\n`;
    });

    const totalDia = vendas.reduce((sum, v) => sum + (v.qtdpedidos * v.preco), 0);
    const totalPedidos = vendas.reduce((sum, v) => sum + v.qtdpedidos, 0);

    const relatorio = `🚬 VENDAS CIGARROS - ${hoje}
${extrato}

💰 TOTAL DIA: R$${totalDia.toFixed(2)}
📦 ${vendas.length} vendas | ${totalPedidos} pedidos`;

    const blob = new Blob([relatorio], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `extrato-${hoje.replace(/\//g, '-')}.txt`;
    a.click();

    alert('✅ Extrato separado por marca salvo!');
}

// ========================================
// EXPORTAR RELATÓRIO DE UMA LINHA
// ========================================
function exportLinha(indice) {
    const venda = vendas[indice];

    if (!venda) {
        alert('❌ Venda não encontrada!');
        return;
    }

    const total = (venda.qtdpedidos * venda.preco).toFixed(2);
    const status = venda.finalizada ? 'FINALIZADA' : 'ABERTA';

    const relatorio = `🚬 RELATÓRIO DA VENDA

Data: ${venda.data}
Marca: ${venda.marca}
Quantidade: ${venda.qtdpedidos} pedidos
Comprador: ${venda.comprador}
Preço unitário: R$${venda.preco.toFixed(2)}
Total: R$${total}
Status: ${status}`;

    const blob = new Blob([relatorio], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `venda-${venda.marca}-${venda.comprador}.txt`;
    a.click();

    alert('✅ Relatório da linha salvo!');
}

// ========================================
// EXPORTAR PARA WHATSAPP
// ========================================
function exportWhatsApp() {
    const hoje = new Date().toLocaleDateString('pt-BR');

    if (vendas.length === 0) {
        alert('❌ Não há vendas para enviar!');
        return;
    }

    const marcas = {};

    vendas.forEach(v => {
        if (!marcas[v.marca]) {
            marcas[v.marca] = [];
        }

        marcas[v.marca].push(v);
    });

    let extrato = '';

    Object.keys(marcas).forEach(marca => {
        extrato += `\n*${marca}*\n`;

        marcas[marca].forEach(v => {
            let total = (v.qtdpedidos * v.preco).toFixed(2);
            let status = v.finalizada ? 'FINALIZADA' : 'ABERTA';

            extrato += `${v.qtdpedidos} pedidos | ${v.comprador} | R$${total} | ${status}\n`;
        });

        const totalMarca = marcas[marca].reduce((sum, v) => sum + (v.qtdpedidos * v.preco), 0);
        const pedidosMarca = marcas[marca].reduce((sum, v) => sum + v.qtdpedidos, 0);

        extrato += `Total ${marca}: R$${totalMarca.toFixed(2)} | ${pedidosMarca} pedidos\n`;
    });

    const totalDia = vendas.reduce((sum, v) => sum + (v.qtdpedidos * v.preco), 0);
    const totalPedidos = vendas.reduce((sum, v) => sum + v.qtdpedidos, 0);

    const relatorio = `🚬 VENDAS CIGARROS - ${hoje}
${extrato}

💰 TOTAL DIA: R$${totalDia.toFixed(2)}
📦 ${vendas.length} vendas | ${totalPedidos} pedidos`;

    const texto = encodeURIComponent(relatorio);
    const link = `https://wa.me/?text=${texto}`;

    window.open(link, '_blank');
}


   
//Função da parte de vendas finalizadas


function exportFinalizadas() {
    const hoje = new Date().toLocaleDateString('pt-BR');
    const finalizadas = vendas.filter(venda => venda.finalizada);

    if (finalizadas.length === 0) {
        alert('❌ Não há vendas finalizadas para exportar!');
        return;
    }

    const marcas = {};

    finalizadas.forEach(v => {
        if (!marcas[v.marca]) {
            marcas[v.marca] = {
                totalPedidos: 0,
                totalValor: 0
            };
        }

        marcas[v.marca].totalPedidos += v.qtdpedidos;
        marcas[v.marca].totalValor += v.qtdpedidos * v.preco;
    });

    let extrato = '';

    Object.keys(marcas).forEach(marca => {
        extrato += `\n===== ${marca} =====\n`;
        extrato += `Total pedidos: ${marcas[marca].totalPedidos}\n`;
        extrato += `Total: R$${marcas[marca].totalValor.toFixed(2)}\n`;
    });

    const totalGeral = finalizadas.reduce((sum, v) => sum + (v.qtdpedidos * v.preco), 0);
    const totalPedidos = finalizadas.reduce((sum, v) => sum + v.qtdpedidos, 0);

    const relatorio = `🚬 VENDAS FINALIZADAS - ${hoje}
${extrato}

💰 TOTAL FINALIZADO: R$${totalGeral.toFixed(2)}
📦 TOTAL PEDIDOS: ${totalPedidos}`;

    const blob = new Blob([relatorio], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `vendas-finalizadas-${hoje.replace(/\//g, '-')}.txt`;
    a.click();

    alert('✅ Extrato das vendas finalizadas salvo!');
}

function limparFinalizadas() {
    const finalizadas = vendas.filter(venda => venda.finalizada);

    if (finalizadas.length === 0) {
        alert('❌ Não há vendas finalizadas para limpar!');
        return;
    }

    if (confirm('🧹 Limpar todas as vendas finalizadas?\n\nAs vendas abertas vão continuar.')) {
        vendas = vendas.filter(venda => !venda.finalizada);
        salvar();
        updateTable();

        alert('✅ Vendas finalizadas limpas!');
    }
}



// ========================================
// INICIALIZAÇÃO + iPhone FIX
// ========================================
document.addEventListener('touchstart', function(){}, true);
updateTable();
