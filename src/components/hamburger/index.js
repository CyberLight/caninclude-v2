import { h } from 'preact';

const Hamburger = ({ onClick, closed }) => (
    <label class="block absolute right-0 top-0 sm:hidden w-14 h-14 p-2 text-purple-100">
        <input type="checkbox" name="menu" class="peer sr-only" onClick={onClick} checked={!closed} />
        <svg class="stroke-current peer-checked:hidden" width="40px" height="40px" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
            <g id="line">
                <line x1="16" x2="56" y1="26" y2="26" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <line x1="16" x2="56" y1="36" y2="36" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <line x1="16" x2="56" y1="46" y2="46" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
            </g>
        </svg>
        <svg class="stroke-current hidden peer-checked:block" width="40px" height="40px" viewBox="0 0 72 72" id="emoji" xmlns="http://www.w3.org/2000/svg">
            <g id="line">
                <line x1="17.5" x2="54.5" y1="17.5" y2="54.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
                <line x1="54.5" x2="17.5" y1="17.5" y2="54.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
            </g>
        </svg>
    </label>
);

export default Hamburger;