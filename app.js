const express = require('express')
const app = express()
const port = 3000

const pool = require('./db')

app.get('/', (req, res) => {
	res.send('Hello, World!')
})

// Тестовый маршрут для проверки подключения к БД
app.get('/db-test', async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT NOW() AT TIME ZONE 'Europe/Kiev' AS local_time;"
		)

		// Преобразование времени в строку без добавления UTC-формата
		const localTime = result.rows[0].local_time.toString()

		res.json({ local_time: localTime })
	} catch (err) {
		console.error(err)
		res.status(500).send('Ошибка при подключении к базе данных')
	}
})

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
