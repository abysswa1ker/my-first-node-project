const express = require('express')
const app = express()
const pool = require('./db') // Подключение к PostgreSQL
app.use(express.json()) // Для обработки JSON

// Получение всех книг
app.get('/literature', async (req, res) => {
	try {
		const allLiterature = await pool.query('SELECT * FROM literature')
		res.json(allLiterature.rows)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Ошибка сервера')
	}
})

// Добавление новой книги
app.post('/literature', async (req, res) => {
	const { title, typeID, genreID, authorID, statusID } = req.body
	try {
		const newBook = await pool.query(
			'INSERT INTO literature (title, typeID, genreID, authorID, statusID) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[title, typeID, genreID, authorID, statusID]
		)
		res.json(newBook.rows[0])
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Ошибка сервера')
	}
})

// Обновление статуса книги
app.put('/literature/:id', async (req, res) => {
	const { id } = req.params
	const { statusID } = req.body
	try {
		const updateBook = await pool.query(
			'UPDATE literature SET statusID = $1 WHERE literatureID = $2',
			[statusID, id]
		)
		res.json('Статус книги обновлен')
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Ошибка сервера')
	}
})

// Удаление книги
app.delete('/literature/:id', async (req, res) => {
	const { id } = req.params
	try {
		await pool.query('DELETE FROM literature WHERE literatureID = $1', [id])
		res.json('Книга удалена')
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Ошибка сервера')
	}
})

// Запуск сервера
app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000')
})
