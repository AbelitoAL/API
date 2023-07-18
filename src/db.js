import pkg from 'pg'

export const consul = new pkg.Pool({
    host: process.env.DB_HOST ||'localhost',
    user: process.env.DB_USER ||'postgres',
    password: process.env.DB_PASSWORD ||'jose',
    database: process.env.DB_DATABASE ||'activoFijo',
    port: process.env.DB_PORT||'5432'
})