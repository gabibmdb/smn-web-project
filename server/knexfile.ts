import path from 'path';

module.exports = {
    client:    'postgresql',
    connection: {
        host : '127.0.0.1',
        user : 'smn_admin',
        password : 'admin',
        database : 'pastry_db'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    useNullAsDefault: true,
};