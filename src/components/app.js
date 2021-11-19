import { h } from 'preact';
import { Router } from 'preact-router';
import { useState } from 'preact/hooks';
import Header from './header';

// Code-splitting is automated for `routes` directory
import Main from '../routes/main';
import Result from '../routes/result';

const App = () => {
	const [showLogo, setShowLogo] = useState(false);

	const onRouteChanged = (e) => {
		switch (e.url) {
			case '/result/': {
				setShowLogo(true);
				break;
			}
			case '/about': {
				setShowLogo(true);
				break;
			}
			default: {
				setShowLogo(false);
				break;
			}
		}
	}
	return (
		<div id="app">
			<Header showLogo={showLogo} />
			<Router onChange={onRouteChanged}>
				<Main path="/" />
				<Result path="/caninclude/" user="me" />
			</Router>
		</div>
	);
}

export default App;
