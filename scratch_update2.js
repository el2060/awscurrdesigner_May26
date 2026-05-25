const fs = require('fs');
let data = fs.readFileSync('plan-direction.html', 'utf8');
data = data.replace('title: "MLO Mapping to Course Outcomes"', 'title: "Module Learning Outcomes Mapping to Course Outcomes"');
data = data.replace('title: "MLO Mapping to NP Graduate Skills & Competencies"', 'title: "Mapping Module Learning Outcome to NP Graduate Skills & Competencies"');
fs.writeFileSync('plan-direction.html', data);
