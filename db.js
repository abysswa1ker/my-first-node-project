const { Pool } = require('pg') // Импортируем Pool из библиотеки pg

// Настраиваем подключение к базе данных
const pool = new Pool({
	user: 'postgres', // Имя пользователя PostgreSQL
	host: 'localhost', // Адрес сервера базы данных
	database: 'mydatabase', // Имя базы данных
	password: 'AV101gms', // Пароль пользователя PostgreSQL
	port: 5432, // Порт (по умолчанию 5432)
})

// Экспортируем pool для использования в других файлах
module.exports = pool
