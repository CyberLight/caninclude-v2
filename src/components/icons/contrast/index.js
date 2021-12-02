import { h } from 'preact';

const ContrastIcon = (props) => (
	<svg viewBox="0 0 512 512" class={`fill-current ${props.class}`}>
	<g>
		<g>
			<path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,457.143V54.857
				c111.088,0,201.143,90.054,201.143,201.143S367.088,457.143,256,457.143z" />
		</g>
	</g>
	</svg>
);

export default ContrastIcon;
