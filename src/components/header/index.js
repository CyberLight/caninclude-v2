import { h } from 'preact';
import Match, { Link } from 'preact-router/match';
import { useState, useEffect } from 'preact/hooks';
import Hamburger from '../hamburger';
import ThemeSwitcher from '../themeswitcher';
import ResultMenuItem from '../resultmenuitem';
import BackLink from "../backlink";

const Header = () => {
	const [menuClosed, setMenuClosed] = useState(undefined);
	const onMenuBtnClick = (e) => setMenuClosed(!e.target.checked);
	const onMenuItemClick = () => setMenuClosed(true);
	const isMenuInitialized = typeof menuClosed !== 'undefined';

	useEffect(() => {
		setMenuClosed(true)
	}, []);

	return (
		<header className={`flex flex-col bg-purple-600 text-gray-50 items-center justify-start sm:flex-row sm:justify-center sm:relative sm:h-14 ${ isMenuInitialized && menuClosed ? '' : 'h-screen fixed top-0 left-0 w-full z-10' }`}>
			<nav class={`flex flex-col text-center w-full sm:flex-row sm:w-auto ${ menuClosed ? 'h-14 overflow-hidden' : 'h-full' }`}>
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
						<ResultMenuItem href="/caninclude" onClick={onMenuItemClick} />
					)}</Match>
					<Match path="/can/include">{({ matches }) => matches && (
						<ResultMenuItem href="/can/include" onClick={onMenuItemClick} />
					)}</Match>
					<li class="contents">
						<a 
							target="_blank" 
							rel="noreferrer" 
							class="block px-2 py-2 h-14 leading-10 hover:bg-purple-300 hover:bg-opacity-25" 
							href="https://github.com/CyberLight/caninclude-v2" onClick={onMenuItemClick}>Github</a>
					</li>
				</ul>
				<ThemeSwitcher class={`${ menuClosed ? '' : 'justify-self-end'}`} />
				<Hamburger onClick={onMenuBtnClick} closed={menuClosed} />
				<Match path="/caninclude">{
					({ matches }) => matches && <BackLink onClick={onMenuItemClick} />}
				</Match>
				<Match path="/can/include">{
					({ matches }) => matches && <BackLink onClick={onMenuItemClick} />}
				</Match>
			</nav>
			<div class={`flex flex-wrap font-thin justify-self-end px-4 py-2 ${ menuClosed && 'hidden sm:block' }`}>v 2.0</div>
		</header>
	);
};

export default Header;
