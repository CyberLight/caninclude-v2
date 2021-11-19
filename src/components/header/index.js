import { h } from 'preact';
import Match, { Link } from 'preact-router/match';

const Header = () => {
	return (
		<header className="flex flex-col sm:flex-row bg-purple-600 text-gray-50 min-h-14 items-center justify-center">
			<nav class="flex items-center w-full sm:w-auto">
				<ul class="flex flex-col text-center w-full sm:flex-row sm:w-auto flex-wrap">
					<li>
						<Link 
							activeClassName="bg-purple-400 bg-opacity-75 bg-no-repeat bg-full-h-3 bg-top bg-gradient-to-r from-purple-400 to-purple-400" 
							class="block px-4 py-2 h-14 leading-10 hover:bg-purple-300 hover:bg-opacity-25 capitalize" 
							href="/">
								<div class="flex uppercase gap-2 items-center">
									<Match path="/">{({ matches }) => !matches && <span class="block w-9 h-9 bg-logo" />}</Match>
									caninclude
								</div>
							</Link>
					</li>
					<li>
						<Link 
							activeClassName="bg-purple-400 bg-opacity-75 bg-no-repeat bg-full-h-3 bg-top bg-gradient-to-r from-purple-400 to-purple-400" 
							class="block px-4 py-2 h-14 leading-10 hover:bg-purple-300 hover:bg-opacity-25 capitalize" 
							href="/about">about</Link>
					</li>
					<li>
						<a 
							target="_blank" 
							rel="noreferrer" 
							class="block px-2 py-2 h-14 leading-10 hover:bg-purple-300 hover:bg-opacity-25" 
							href="http://github.com/CyberLight/caninclude-v2">Github</a>
					</li>
				</ul>
			</nav>
			<ul class="flex flex-wrap font-thin justify-self-end">
				<li class="px-4 py-2">v 2.0</li>
			</ul>
		</header>
	);
};

export default Header;
