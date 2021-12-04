const polka = require('polka');
const {makeHeadersFor} = require('./utils');
const { PORT=8080 } = process.env;

const isProd = process.env.NODE_ENV === 'production';
const staticMiddleware = require('sirv')('build', { 
	single: true, 
	dev: !isProd
});
const { caninclude } = require('./api.js');

function onError(err, req, res) {
  console.error(`> ERROR: ${req.method}(${req.url}) ~>`, err);
  const data = JSON.stringify({ ok: false, message: 'Oops! Something went wrong!', type: 'warning' });
  res.writeHead(err.code || 500, makeHeadersFor(data));
  res.end(data);
}

let app = polka({ onError });
	app.use((req, res, next) => {
		if (!req.headers['X-Forwarded-Proto'] || req.headers['X-Forwarded-Proto'].indexOf('https') !== -1) {
			return next();
		}
		const url = `https://${req.hostname}${req.url}`;
		let str = `Redirecting to ${url}`;
		res.writeHead(302, {
			Location: url,
			'Content-Type': 'text/plain',
			'Content-Length': str.length
		});
		res.end(str);
	})
	app.use((req, res, next) => {
		try {
			if (req.path === '/api/caninclude' && req.method === 'GET') {
				return caninclude(req, res);
			}
		} catch (e) {
			return next(e);
		}
		return next();
	})
	if (isProd) {
		app.use(staticMiddleware);
	}
	app.listen(PORT, () => {
		console.log(`> Running on localhost:${PORT}`);
	});