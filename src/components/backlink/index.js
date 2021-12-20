import { h } from 'preact';
import { Link } from 'preact-router/match';
import LeftArrowIcon from '../icons/leftarrow';

const BackLink = ({ onClick }) => {
    return (
        <Link href="/" class="absolute left-0 top-0 p-4 w-14 h-14 sm:hidden" onClick={onClick}>
            <LeftArrowIcon />
        </Link>
    );
}

export default BackLink;