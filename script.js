// ========================================
// CIGARROS LOJA - JAVASCRIPT
// ========================================

// ARMAZENAMENTO LOCAL (salva no celular)
let vendas = JSON.parse(localStorage.getItem('vendas_cigarros')) || [];

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
        let valorTotal = (venda.qtdpedidos * venda.preco).toFixed(2);
        totalP++;
        totalV += parseFloat(valorTotal);

        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${venda.marca}</td>
            <td><strong>${venda.qtdpedidos}</strong></td>
            <td><span class="comprador">${venda.comprador}</span></td>
            <td>R$ ${valorTotal}</td>
            <td style="text-align:center;">
                <button onclick="deletarLinha(${indice})"
                        style="background:#e74c3c;color:white;border:none;border-radius:50%;width:35px;height:35px;font-size:16px;cursor:pointer;padding:0;">
                    🗑️
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('totalP').textContent = totalP;
    document.getElementById('totalV').textContent = 'R$' + totalV.toFixed(2);
}

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
    let marca = document.getElementById('marca').value.toUpperCase().trim();
    let qtdpedidos = parseInt(document.getElementById('qtdpedidos').value) || 1;
    let comprador = document.getElementById('comprador').value.toUpperCase().trim();
    let preco = parseFloat(document.getElementById('preco').value) || 0;

    if (marca && comprador && preco > 0 && qtdpedidos > 0) {
        vendas.push({
            marca,
            qtdpedidos,
            comprador,
            preco,
            data: new Date().toLocaleDateString('pt-BR')
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
// EXPORTAR EXTRATO
// ========================================
function exportData() {
    const hoje = new Date().toLocaleDateString('pt-BR');

    const extrato = vendas.map(v => {
        let total = (v.qtdpedidos * v.preco).toFixed(2);
        return `${v.data} | ${v.marca} | ${v.qtdpedidos} pedidos | ${v.comprador} | R$${total}`;
    }).join('\n');

    const totalDia = vendas.reduce((sum, v) => sum + (v.qtdpedidos * v.preco), 0);
    const totalPedidos = vendas.reduce((sum, v) => sum + v.qtdpedidos, 0);

    const relatorio = `🚬 VENDAS CIGARROS - ${hoje}

${extrato}

💰 TOTAL DIA: R$${totalDia.toFixed(2)}
📦 ${vendas.length} vendas | ${totalPedidos} pedidos
${hoje}`;

    const blob = new Blob([relatorio], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `extrato-${hoje.replace(/\//g, '-')}.txt`;
    a.click();

    alert('✅ Extrato salvo em Downloads!');
}

// ========================================
// INICIALIZAÇÃO + iPhone FIX
// ========================================
document.addEventListener('touchstart', function(){}, true);
updateTable();

