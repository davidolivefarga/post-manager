const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./dist'));
app.use(bodyParser.json());

app.get('/*', function (request, response) {
	response.sendFile('index.html', { root: 'dist/' });
});

app.listen(process.env.PORT || 8080, function () {
	console.log('App now running on port', process.env.PORT || 8080);
});
