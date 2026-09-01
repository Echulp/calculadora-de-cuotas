const tarjetas = [
    {
        id: "patagonia365",
        nombre: "Patagonia 365",
        planes: [
            { cuotas: 1, recargo: 0, desc: "1 Pago" },
            { cuotas: 2, recargo: 7, desc: "2 Cuotas" },
            { cuotas: 3, recargo: 7, desc: "3 Cuotas" },
            { cuotas: 4, recargo: 14, desc: "4 Cuotas" },
            { cuotas: 5, recargo: 14, desc: "5 Cuotas" },
            { cuotas: 6, recargo: 14, desc: "6 Cuotas" },
            { cuotas: 7, recargo: 25, desc: "7 Cuotas" },
            { cuotas: 8, recargo: 25, desc: "8 Cuotas" },
            { cuotas: 9, recargo: 25, desc: "9 Cuotas" },
            { cuotas: 10, recargo: 25, desc: "10 Cuotas" },
            { cuotas: 11, recargo: 25, desc: "11 Cuotas" },
            { cuotas: 12, recargo: 25, desc: "12 Cuotas" }
        ]
    },
    {
        id: "naranja",
        nombre: "Naranja",
        planes: [
            { cuotas: 1, recargo: 0, desc: "1 Pago" },
            { cuotas: 3, recargo: 0, desc: "Plan Z (3 cuotas)" },
            { cuotas: 5, recargo: 0, desc: "5 Cuotas" },
            { cuotas: 8, recargo: 10, desc: "8 Cuotas" },
            { cuotas: 10, recargo: 15, desc: "10 Cuotas" },
            { cuotas: 12, recargo: 20, desc: "12 Cuotas" }
        ]
    },
    {
        id: "hipotecario",
        nombre: "Visa y Mastercard - Banco Hipotecario",
        planes: [
            { cuotas: 1, recargo: 0, desc: "1 Pago" },
            { cuotas: 3, recargo: 0, desc: "3 Cuotas" },
            { cuotas: 6, recargo: 0, desc: "6 Cuotas (Solo Jueves)" }
        ]
    },
    {
        id: "wapa",
        nombre: "Visa y Mastercard - Banco Patagonia",
        planes: [
            { cuotas: 1, recargo: 0, desc: "1 Pago" },
            { cuotas: 3, recargo: 0, desc: "3 Cuotas Sin Interés" }
        ]
    },
    {
        id: "mercadopago",
        nombre: "Otras Tarjetas",
        planes: [
            { cuotas: 1, recargo: 0, desc: "1 Pago" },
            { cuotas: 3, recargo: 5, desc: "3 Cuotas" },
            { cuotas: 6, recargo: 10, desc: "6 Cuotas" },
            { cuotas: 9, recargo: 14, desc: "9 Cuotas" },
            { cuotas: 12, recargo: 15, desc: "12 Cuotas" },
            { cuotas: 18, recargo: 22, desc: "18 Cuotas" }
        ]
    },
    {
        id: "promo1",
        nombre: "PROMO: Bremen y Einhell",
        planes: [
            { cuotas: 1, recargo: 0, desc: "1 Pago" },
            { cuotas: 3, recargo: 0, desc: "3 Cuotas" }
        ]
    },
    {
        id: "promo2",
        nombre: "PROMO: Living, Platinum, Genoud",
        planes: [
            { cuotas: 1, recargo: 0, desc: "1 Pago" },
            { cuotas: 3, recargo: 0, desc: "3 Cuotas" }
        ]
    },
    {
        id: "promo3",
        nombre: "PROMO: Genoud - Naranja X / Bancarizadas",
        planes: [
            { cuotas: 1, recargo: 0, desc: "1 Pago" },
            { cuotas: 12, recargo: 0, desc: "12 Cuotas" }
        ]
    }
];

const importeInput = document.getElementById('importe');
const tarjetaSelect = document.getElementById('tarjeta');
const resultadosContainer = document.getElementById('resultados-container');

tarjetas.forEach((t, index) => {
    const option = document.createElement('option');
    option.value = index; 
    option.textContent = t.nombre;
    tarjetaSelect.appendChild(option);
});

const formatMoney = (amount) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
};

const calcularCuotas = () => {
    let rawValue = importeInput.value.replace('$ ', '').replace(/\./g, '').replace(',', '.');
    const importe = parseFloat(rawValue);
    const tarjetaIndex = tarjetaSelect.value;

    if (isNaN(importe) || importe <= 0 || tarjetaIndex === "") {
        resultadosContainer.innerHTML = '<div class="no-data">Ingresá un importe válido y seleccioná una tarjeta.</div>';
        return;
    }

    const tarjeta = tarjetas[tarjetaIndex];
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Plan</th>
                    <th>Recargo</th>
                    <th>Valor Cuota</th>
                    <th>Total a Pagar</th>
                </tr>
            </thead>
            <tbody>
    `;

    tarjeta.planes.forEach(plan => {
        const total = importe * (1 + (plan.recargo / 100));
        const valorCuota = total / plan.cuotas;
        const recargoTexto = plan.recargo === 0 ? "Sin recargo" : `${plan.recargo}%`;

        html += `
            <tr>
                <td>${plan.desc}</td>
                <td>${recargoTexto}</td>
                <td>${formatMoney(valorCuota)}</td>
                <td class="total-highlight">${formatMoney(total)}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    resultadosContainer.innerHTML = html;
};

importeInput.addEventListener('input', function(e) {
    if (e.data === '.') {
        this.value = this.value.slice(0, -1) + ',';
    }

    let val = this.value.replace('$ ', '').replace(/\./g, '');
    val = val.replace(/[^\d,]/g, '');

    const partes = val.split(',');
    if (partes.length > 2) {
        val = partes[0] + ',' + partes.slice(1).join('');
    }

    if (val === '') {
        this.value = '';
        calcularCuotas();
        return;
    }

    const splitValue = val.split(',');
    let entero = splitValue[0];
    let decimal = splitValue[1];

    if (entero === '') entero = '0';

    const numero = parseInt(entero, 10);
    let formateado = isNaN(numero) ? '' : new Intl.NumberFormat('es-AR').format(numero);

    if (splitValue.length > 1) {
        decimal = decimal.substring(0, 2);
        this.value = '$ ' + formateado + ',' + decimal;
    } else {
        this.value = '$ ' + formateado;
    }
    
    calcularCuotas();
});

tarjetaSelect.addEventListener('change', calcularCuotas);
