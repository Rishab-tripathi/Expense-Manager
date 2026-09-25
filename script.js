// Turns a plain number into a rupee amount, e.g. 8000 -> ₹8,000
function formatMoney(amount) {
  var sign = amount < 0 ? '-' : '';
  return sign + '₹' + Math.abs(amount).toLocaleString('en-IN');
}

// Reads the income + all four sliders, then updates the balance and message
function updateBudget() {
  var income = parseInt(document.getElementById('incomeInput').value, 10) || 0;

  var rent = parseInt(document.getElementById('rentSlider').value, 10);
  var food = parseInt(document.getElementById('foodSlider').value, 10);
  var transport = parseInt(document.getElementById('transportSlider').value, 10);
  var healthcare = parseInt(document.getElementById('healthcareSlider').value, 10);

  document.getElementById('rentValue').textContent = formatMoney(rent);
  document.getElementById('foodValue').textContent = formatMoney(food);
  document.getElementById('transportValue').textContent = formatMoney(transport);
  document.getElementById('healthcareValue').textContent = formatMoney(healthcare);

  var totalSpent = rent + food + transport + healthcare;
  var remaining = income - totalSpent;

  var balanceEl = document.getElementById('balanceAmount');
  var messageEl = document.getElementById('feedbackMessage');

  balanceEl.textContent = formatMoney(remaining);
  balanceEl.className = 'balance-amount';

  if (remaining < 0) {
    balanceEl.classList.add('state-bad');
    messageEl.textContent = 'This budget runs a deficit. In real life, that gap often turns into debt.';
  } else if (remaining < 500) {
    balanceEl.classList.add('state-warn');
    messageEl.textContent = 'Very tight. A single unexpected expense could tip this into debt.';
  } else {
    balanceEl.classList.add('state-good');
    messageEl.textContent = 'This budget leaves a safe cushion for the month.';
  }
}

// Run once so the numbers are correct as soon as the page loads
updateBudget();
