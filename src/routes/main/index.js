import { h } from 'preact';
import Search from '../../components/search'
import Logo from '../../components/logo'

const Main = () => (
	<main class="flex flex-col items-center justify-center min-h-content bg-repeat" style="background-image: url(/assets/bg-ny.svg)">
		<h1 class="sr-only">Can I include</h1>
		<section class="flex flex-col items-center bg-gray-50 dark:bg-gray-900 px-4 pt-5 rounded-lg">
            <h2 class="sr-only">Can I include a child tag to a parent tag?</h2>
			<Logo />
			<Search />
		</section>
	</main>
);

export default Main;
