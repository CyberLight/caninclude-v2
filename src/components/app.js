import { h } from 'preact';
import { Router } from 'preact-router';
import Header from './header';
import Footer from './footer';

// Code-splitting is automated for `routes` directory
import Main from '../routes/main';
import Result from '../routes/result';

const App = () => {
	return (
		<div id="app" class="flex flex-col min-h-full relative pb-14">
			<Header />
			<Router>
				<Main path="/" />
				<Result path="/caninclude" />
			</Router>
			<Footer />
		</div>
	);
}

export default App;
