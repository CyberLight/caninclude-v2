import { h } from 'preact';

const Footer = () => (
    <footer class="flex flex-row font-thin h-20 bg-black justify-around items-center text-gray-200">    
        <section class="py-1 px-2">
            <h3 class="text-sm">Links:</h3>
            <ul class="flex flex-row text-xs gap-2 flex-wrap">
                <li><a href="https://github.com/CyberLight">Author - CyberLight</a></li>
            </ul>
        </section>
        <section class="py-1 px-2 border-l border-gray-400 hidden sm:block">
            <h3 class="text-sm">Special thanks:</h3>
            <ul class="flex flex-row text-xs gap-2 flex-wrap">
                <li><a href="https://caniuse.com/">Can I Use</a></li>
                <li><a href="https://html.spec.whatwg.org/">HTML Spec WHATWG</a></li>
                <li><a href="https://developer.mozilla.org/">MDN</a></li>
                <li><a href="https://pepelsbey.net/author/">Vadim Makeev</a></li>
                <li><a href="https://htmlacademy.ru/"> htmlacademy</a></li>
            </ul>
        </section>
    </footer>
);

export default Footer;