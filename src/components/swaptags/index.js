import { h } from 'preact';
import SwapIcon from '../icons/swap';

const SwapTags = (props) => {
    return (
        <a href={props.href} class={`block ${props.class}`}>
            <SwapIcon class="mx-auto my-1" />
            Swap tags
        </a>
    );
};

export default SwapTags;