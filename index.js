const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db.js');
const router = require('./routes/index.js');

const app = express();
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

const PORT = 5000 || process.env.PORT;

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log('connnect to DB');
		console.log('Server is running ' + PORT);
	});
});
