const fs = require('fs');
const file = '../src/app/pages/MarketplacePage.tsx';
let data = fs.readFileSync(file, 'utf8');
data = data.replace('className="chx-trust-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 4 }}', 'className="chx-trust-grid" style={{ display: "grid", gap: 12, marginTop: 4 }}');
data = data.replace('className="chx-ib-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}', 'className="chx-ib-grid" style={{ display: "grid", gap: 12, marginTop: 20 }}');
fs.writeFileSync(file, data, 'utf8');
console.log('done');
