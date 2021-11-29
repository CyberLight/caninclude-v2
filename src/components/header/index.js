import { h } from 'preact';
import Match, { Link } from 'preact-router/match';
import { useState, useEffect } from 'preact/hooks';
import Hamburger from '../hamburger';

const Header = () => {
	const [menuClosed, setMenuClosed] = useState(false);
	const onMenuBtnClick = (e) => setMenuClosed(!e.target.checked);
	const onMenuItemClick = () => setMenuClosed(true);

	useEffect(() => {
		setMenuClosed(true)
	}, []);

	return (
		<header className="flex flex-col sm:flex-row bg-purple-600 text-gray-50 min-h-14 items-center justify-center">
			<nav class={`flex flex-col text-center w-full sm:flex-row sm:w-auto relative ${ menuClosed && 'h-14 overflow-hidden' || 'h-screen'}`}>
				<ul class="contents">
					<li class="contents">
						<Link 
							activeClassName="bg-purple-400 bg-opacity-75 bg-no-repeat bg-full-h-3 bg-top bg-gradient-to-r from-purple-400 to-purple-400 order-first sm:order-none pointer-events-none" 
							class="block px-4 py-2 h-14 leading-10 hover:bg-purple-300 hover:bg-opacity-25 capitalize" 
							href="/"
							onClick={onMenuItemClick}
							>
								<div class="flex uppercase gap-2 items-center justify-center">
									<Match path="/">{({ matches }) => !matches && <span class="block w-9 h-9 bg-logo" />}</Match>
									caninclude
								</div>
						</Link>
					</li>
					<Match path="/caninclude">{({ matches }) => matches && (
						<li class="contents">
							<Link 
								activeClassName="bg-purple-400 bg-opacity-75 bg-no-repeat bg-full-h-3 bg-top bg-gradient-to-r from-purple-400 to-purple-400 order-first sm:order-none pointer-events-none" 
								class="block px-4 py-2 h-14 leading-10 hover:bg-purple-300 hover:bg-opacity-25 capitalize" 
								href="/caninclude"
								onClick={onMenuItemClick}>Result</Link>
						</li>
					)}</Match>
					<li class="contents">
						<a 
							target="_blank" 
							rel="noreferrer" 
							class="block px-2 py-2 h-14 leading-10 hover:bg-purple-300 hover:bg-opacity-25" 
							href="https://github.com/CyberLight/caninclude-v2" onClick={onMenuItemClick}>Github</a>
					</li>
				</ul>
				<Hamburger onClick={onMenuBtnClick} closed={menuClosed} />
			</nav>
			<div class={`flex flex-wrap font-thin justify-self-end px-4 py-2 ${ menuClosed && 'hidden sm:block' }`}>v 2.0</div>
		</header>
	);
};

export default Header;
