const http = require('http');

http.get('http://localhost:5000/api/bio', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('BIO DATA:');
        console.log(data);
    });
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});
