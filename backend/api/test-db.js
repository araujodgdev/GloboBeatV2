import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: process.env.POSTGRES_HOST || 'db',
    port: 5432,
    user: process.env.POSTGRES_USER || 'user',
    password: process.env.POSTGRES_PASSWORD || 'pass',
    database: process.env.POSTGRES_DB || 'trilhas',
});

async function testConnection() {
    try {
        await client.connect();
        console.log('✅ Conexão com o Postgres bem-sucedida!');
        const res = await client.query('SELECT NOW()');
        console.log('🕒 Data/hora do servidor:', res.rows[0]);
    } catch (err) {
        console.error('❌ Erro ao conectar com o Postgres:', err);
    } finally {
        await client.end();
    }
}

testConnection();