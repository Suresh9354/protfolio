import axios from 'axios';

async function checkData() {
    try {
        const bioRes = await axios.get('http://localhost:5000/api/bio');
        console.log('BIO DATA:');
        console.log(JSON.stringify(bioRes.data, null, 2));

        const projectRes = await axios.get('http://localhost:5000/api/projects');
        console.log('\nPROJECT DATA:');
        console.log(JSON.stringify(projectRes.data, null, 2));
    } catch (err) {
        console.error('Error fetching data:', err.message);
    }
}

checkData();
