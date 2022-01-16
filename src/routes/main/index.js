import { h } from 'preact';
import Search from '../../components/search'
import Logo from '../../components/logo'

const Main = () => (
	<main class="flex flex-col items-center justify-center min-h-content">
		<h1 class="sr-only">Can I include</h1>
		<section class="flex flex-col items-center">
            <h2 class="sr-only">Welcome</h2>
			<Logo />
        </section>
		<section class="flex flex-col items-center">
			<h2 class="sr-only">Can I include a child tag to a parent tag?</h2>
			<Search />
		</section>
	</main>
);

export default Main;
