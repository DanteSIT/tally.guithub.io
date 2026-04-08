// app.js ---------------------------------------------------------------
const socket = io();                // connect to http://localhost:3000

// ---- UI helpers -------------------------------------------------------
function setValue(id, value) {
  const spanId = id === 's' ? 's' : id === 'p' ? 'p' : 'v';
  document.getElementById(spanId).textContent = value;
}
function sendUpdate(field, val) {
  // `field` is one of "students","parents","vip"
  socket.emit(`update-${field}`, Number(val));
}

// ---- Initial state ----------------------------------------------------
socket.on('connect', () => console.log('Connected'));
socket.on('data', data => {
  setValue('s', data.students);
  setValue('p', data.parents);
  setValue('v', data.vip);
});

// ---- Event handlers ---------------------------------------------------
document.getElementById('input-s').addEventListener('change', e => sendUpdate('students', e.target.value));
document.getElementById('input-p').addEventListener('change', e => sendUpdate('parents',   e.target.value));
document.getElementById('input-v').addEventListener('change', e => sendUpdate('vip',       e.target.value));

// ---- CSV export --------------------------------------------------------
document.getElementById('csvBtn').addEventListener('click', () => {
  const csv = [
    "Field,Value",
    ["students", students],
    ["parents",   parents ],
    ["vip",       vip      ]
  ].map(pair => `${pair[0]},\${pair[1]}`).join('\n');

  const blob = new Blob([csv], {type:'text/csv'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = 'dashboard-values.csv';
  a.click();
  URL.revokeObjectURL(url);
});
