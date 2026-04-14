const data = {
  charges: [
    { nom: 'Loyer', montant: 900 },
    { nom: 'Électricité', montant: 70 },
    { nom: 'Assurance', montant: 45 }
  ],
  vie: [
    { categorie: 'Repas', montant: 350 },
    { categorie: 'Essence', montant: 120 },
    { categorie: 'Courses', montant: 260 }
  ],
  abonnements: [
    { nom: 'Téléphone', prix: 20 },
    { nom: 'Internet', prix: 30 },
    { nom: 'Streaming', prix: 15 }
  ],
  wishlist: [
    { nom: 'Week-end', prix: 300 },
    { nom: 'Nouveau casque', prix: 180 }
  ]
};

const fmt = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const incomeInput = document.getElementById('income');

function renderList(id, items, leftKey, rightKey) {
  const root = document.getElementById(id);
  root.innerHTML = '';

  items.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'item';
    row.innerHTML = `<span class="name">${item[leftKey]}</span><strong>${fmt.format(item[rightKey])}</strong>`;
    root.appendChild(row);
  });
}

function sum(arr, field) {
  return arr.reduce((total, item) => total + item[field], 0);
}

function updateDashboard() {
  const income = Number(incomeInput.value) || 0;
  const totalCharges = sum(data.charges, 'montant') + sum(data.abonnements, 'prix');
  const totalVie = sum(data.vie, 'montant');
  const epargne = Math.max(0, income - totalCharges - totalVie);

  const pctCharges = income ? (totalCharges / income) * 100 : 0;
  const pctVie = income ? (totalVie / income) * 100 : 0;
  const pctEpargne = income ? (epargne / income) * 100 : 0;

  document.getElementById('total-income').textContent = fmt.format(income);
  document.getElementById('restant').textContent = fmt.format(epargne);

  document.getElementById('gauge-charges').style.width = `${pctCharges.toFixed(2)}%`;
  document.getElementById('gauge-vie').style.width = `${pctVie.toFixed(2)}%`;
  document.getElementById('gauge-epargne').style.width = `${pctEpargne.toFixed(2)}%`;

  document.getElementById('pct-charges').textContent = `${pctCharges.toFixed(1)}%`;
  document.getElementById('pct-vie').textContent = `${pctVie.toFixed(1)}%`;
  document.getElementById('pct-epargne').textContent = `${pctEpargne.toFixed(1)}%`;
}

renderList('charges-list', data.charges, 'nom', 'montant');
renderList('vie-list', data.vie, 'categorie', 'montant');
renderList('abo-list', data.abonnements, 'nom', 'prix');
renderList('wish-list', data.wishlist, 'nom', 'prix');

incomeInput.addEventListener('input', updateDashboard);
updateDashboard();
