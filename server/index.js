const polka = require('polka');
const { PORT=8080 } = process.env;
const api = require('./api.js');

let app = polka();
if (process.env.NODE_ENV === 'production') {
    app = app.use(require('sirv')('build'));
}
app.use('api', api)
	.listen(PORT, () => {
		console.log(`> Running on localhost:${PORT}`);
	});