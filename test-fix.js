// Prueba rápida de los endpoints que estaban fallando
const http = require('http');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data
        });
      });
    }).on('error', reject);
  });
}

async function testEndpoints() {
  const baseUrl = 'http://localhost:3000';
  
  // Lista de endpoints que estaban fallando
  const endpoints = [
    '/api/ligas',
    '/api/equipos', 
    '/api/jugadores',
    '/api/temporadas'
  ];
  
  console.log('🧪 Probando endpoints que estaban dando 502...\n');
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Probando GET ${endpoint}...`);
      const response = await makeRequest(`${baseUrl}${endpoint}`);
      const status = response.status;
      
      if (status === 200) {
        console.log(`✅ ${endpoint} - Status: ${status} - OK!`);
      } else {
        console.log(`❌ ${endpoint} - Status: ${status} - Error`);
      }
    } catch (error) {
      console.log(`💥 ${endpoint} - Error: ${error.message}`);
    }
  }
  
  console.log('\n🔍 Probando endpoint de diagnóstico...');
  try {
    const response = await makeRequest(`${baseUrl}/test-di`);
    if (response.status === 200) {
      console.log('✅ /test-di funcionando');
      console.log('Respuesta:', response.data.substring(0, 500) + '...');
    }
  } catch (error) {
    console.log('❌ /test-di falló:', error.message);
  }
}

testEndpoints().catch(console.error);