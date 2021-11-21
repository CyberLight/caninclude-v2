import { h } from 'preact';
import { Router } from 'preact-router';
import Header from './header';
import Footer from './footer';

// Code-splitting is automated for `routes` directory
import Main from '../routes/main';
import Result from '../routes/result';
import About from '../routes/about';

const App = () => {
	return (
		<div id="app" class="flex flex-col h-screen">
			<Header />
			<Router>
				<Main path="/" />
				<About path="/about" />
				<Result path="/caninclude" />
			</Router>
			<Footer />
		</div>
	);
}

export default App;
