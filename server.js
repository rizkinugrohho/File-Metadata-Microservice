'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer'); // require and use "multer"...
var upload = multer({ storage: multer.memoryStorage() }); // store temporarily in memory only

var app = express();

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
	return res.json({ greetings: 'Hello, API' });
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
	if (req.file !== undefined) {
		return res.json({
			name: req.file.originalname,
			type: req.file.mimetype,
			size: req.file.size
		});
	} else {
		return res.json({ error: 'file is required' });
	}
});

const listener = app.listen(process.env.PORT || 3000, function () {
	console.log('Node.js listening on port ' + listener.address().port);
});