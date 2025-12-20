const http = require('http');
const fs = require('fs');

function fetchData(url, label) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => resolve({ label, data: JSON.parse(data) }));
        }).on('error', (err) => reject(err));
    });
}

async function main() {
    try {
        const bio = await fetchData('http://localhost:5000/api/bio', 'BIO');
        const projects = await fetchData('http://localhost:5000/api/projects', 'PROJECTS');
        const output = JSON.stringify({ bio: bio.data, projects: projects.data }, null, 2);
        fs.writeFileSync('api_data.json', output);
        console.log('Data saved to api_data.json');
    } catch (err) {
        console.error('Error:', err.message);
    }
}

main();
