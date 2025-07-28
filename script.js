let contragents = [];

window.onload = async function () {
  const response = await fetch('contragents.json');
  contragents = await response.json();
  updateSuggestions('');
  document.getElementById('counterpartyInput').addEventListener('input', (e) => {
    updateSuggestions(e.target.value);
  });
};

function updateSuggestions(value) {
  const datalist = document.getElementById('suggestions');
  datalist.innerHTML = '';
  const filtered = contragents.filter(c => c.toLowerCase().includes(value.toLowerCase()));
  filtered.forEach(c => {
    const option = document.createElement('option');
    option.value = c;
    datalist.appendChild(option);
  });
}

function addCounterparty() {
  const input = document.getElementById('counterpartyInput');
  const name = input.value.trim();
  const message = document.getElementById('message');

  if (!name) {
    message.textContent = "Введіть назву контрагента.";
    return;
  }

  if (!contragents.includes(name)) {
    contragents.push(name);
    message.textContent = `Контрагента "${name}" додано (лише в пам'яті, збереження в файл потребує бекенда).`;
    updateSuggestions('');
    input.value = '';
  } else {
    message.textContent = `Контрагент "${name}" вже існує.`;
  }
}

function generateAct() {
  const date = document.getElementById('date').value;
  const name = document.getElementById('counterpartyInput').value;
  const message = document.getElementById('message');

  if (!date || !name) {
    message.textContent = "Заповніть дату та назву контрагента для створення акту.";
    return;
  }

  message.textContent = `✔️ Акт звірки для "${name}" від ${date} створено (імітація).`;
}
