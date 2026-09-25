// World Bank extreme poverty line, in rupees per day (about $2.15)
var POVERTY_LINE = 180;

// Used to scale the bar: what daily income counts as "full" on the gauge
var GAUGE_MAX = 350;

function checkPovertyLine() {
  var income = parseInt(document.getElementById('incomeInput').value, 10) || 0;
  var daily = Math.round(income / 30);

  document.getElementById('dailyAmount').textContent = '₹' + daily + ' / day';

  var percent = Math.min(100, Math.round((daily / GAUGE_MAX) * 100));
  document.getElementById('gaugeFill').style.width = percent + '%';

  var dailyEl = document.getElementById('dailyAmount');
  var verdictEl = document.getElementById('verdictMessage');

  if (daily < POVERTY_LINE) {
    dailyEl.className = 'balance-amount state-bad';
    verdictEl.textContent = 'This is below the World Bank extreme poverty line of ₹180/day ($2.15).';
  } else {
    dailyEl.className = 'balance-amount state-good';
    verdictEl.textContent = 'This is above the World Bank extreme poverty line of ₹180/day ($2.15), though still a very low income.';
  }
}

checkPovertyLine();
