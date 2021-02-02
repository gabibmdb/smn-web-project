import knex from 'knex';

const connection = knex({
    client:    'postgresql',
    connection: {
        host : '127.0.0.1',
        user : 'smn_admin',
        password : 'admin',
        database : 'pastry_db'
    },
    useNullAsDefault: true,
});

export default connection;