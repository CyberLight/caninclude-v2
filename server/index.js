const polka = require('polka');
const { PORT=8080 } = process.env;

const isProd = process.env.NODE_ENV === 'production';
const staticMiddleware = require('sirv')('build', { 
	single: true, 
	dev: !isProd
});
const { caninclude } = require('./api.js');

let app = polka();
	app.use((req, res, next) => {
		if (req.path === '/api/caninclude' && req.method === 'GET') {
			return caninclude(req, res);
		}
		next();
	})
	if (isProd) {
		app.use(staticMiddleware);
	}
	app.listen(PORT, () => {
		console.log(`> Running on localhost:${PORT}`);
	});