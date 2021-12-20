import { h } from 'preact';
import { Link } from 'preact-router/match';

const ResultMenuItem = ({ onClick, href }) => {
    return (
        <li class="contents">
            <Link 
                activeClassName="bg-purple-400 bg-opacity-75 bg-no-repeat bg-full-h-3 bg-top bg-gradient-to-r from-purple-400 to-purple-400 order-first sm:order-none pointer-events-none" 
                class="block px-4 py-2 h-14 leading-10 hover:bg-purple-300 hover:bg-opacity-25 capitalize" 
                href={href}
                onClick={onClick}>Result</Link>
        </li>
    );
}

export default ResultMenuItem;