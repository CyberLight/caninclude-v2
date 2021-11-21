import { h } from 'preact';

const Result = ({ matches }) => {
	return (
		<div class="flex">
			{`You matches: ${matches.child} > ${matches.parent}`}
		</div>
	);
}

export default Result;
