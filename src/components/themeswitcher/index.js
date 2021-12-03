import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import MoonIcon from '../icons/moon';
import SunIcon from '../icons/sun';
import ContrastIcon from '../icons/contrast';

const ThemeSwitcher = (props) => {
    const [theme, setTheme] = useState('auto');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if ('theme' in localStorage) {
                setTheme(window.localStorage.theme);
            } else {
                setTheme('auto');
            }
        }
    }, [setTheme]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (theme === 'auto') {
                window.localStorage.removeItem('theme');
            } else {
                window.localStorage.theme = theme;
            }
            if (localStorage.theme === 'dark' || 
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
    }, [theme]);

    const onClickTheme = (e) => {
        setTheme(e.target.value);
    }

    return (
        <ul class={`flex border rounded-md max-w-max mx-auto mt-auto mb-4 md:mx-2 md:h-1/2 md:max-h-7 md:my-auto ${props.class}`}>
            <li class="h-full">  
                <input type="radio" id="light_theme" name="theme" class="sr-only peer" value="light" onClick={onClickTheme} checked={theme === 'light'} />
                <label class="w-full h-full peer-checked:bg-white peer-checked:text-black inline-block px-2 rounded-tl-md rounded-bl-md" htmlFor="light_theme"><SunIcon class="w-4 h-4 inline-block mr-2 my-auto" />Light</label>
            </li>
            <li class="h-full">
                <input type="radio" id="dark_theme" name="theme" class="sr-only peer" value="dark" onClick={onClickTheme} checked={theme === 'dark'} />
                <label class="w-full h-full peer-checked:bg-white peer-checked:text-black border-l border-r inline-block px-2" htmlFor="dark_theme"><MoonIcon class="w-4 h-4 inline-block mr-2 my-auto" />Dark</label>
            </li>
            <li class="h-full">
                <input type="radio" id="auto_theme" name="theme" class="sr-only peer" value="auto" onClick={onClickTheme} checked={theme === 'auto'} />
                <label class="w-full h-full peer-checked:bg-white peer-checked:text-black inline-block px-2 rounded-tr-md rounded-br-md" htmlFor="auto_theme"><ContrastIcon class="w-4 h-4 inline-block mr-2 my-auto" />Auto</label>
            </li>
        </ul>
    );
}

export default ThemeSwitcher;