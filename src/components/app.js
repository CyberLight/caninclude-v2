import { h } from 'preact';
import { Router } from 'preact-router';
import Header from './header';

// Code-splitting is automated for `routes` directory
import Main from '../routes/main';
import Profile from '../routes/profile';

const App = () => (
	<div id="app">
		<Header />
		<Router>
			<Main path="/" />
			<Profile path="/profile/" user="me" />
		</Router>
	</div>
)

export default App;
