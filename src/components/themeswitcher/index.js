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
        <ul class={`flex border rounded-md max-w-max mr-auto ml-auto mt-auto sm:mx-2 sm:h-1/2 sm:m-auto md:max-h-7 md:my-auto ${props.class}`}>
            <li class="h-full overflow-hidden">  
                <input type="radio" id="light_theme" name="theme" class="sr-only peer" value="light" onClick={onClickTheme} checked={theme === 'light'} />
                <div class="flex peer-checked:bg-white peer-checked:text-black rounded-tl-md rounded-bl-md h-full">
                    <label class="flex h-full px-2" htmlFor="light_theme"><SunIcon class="w-4 h-4 inline-block m-2 my-auto" />Light</label>
                </div>
            </li>
            <li class="h-full overflow-hidden">
                <input type="radio" id="dark_theme" name="theme" class="sr-only peer" value="dark" onClick={onClickTheme} checked={theme === 'dark'} />
                <div class="flex peer-checked:bg-white peer-checked:text-black border-l border-r h-full">
                    <label class="flex h-full px-2" htmlFor="dark_theme"><MoonIcon class="w-4 h-4 inline-block m-2 my-auto" />Dark</label>
                </div>
            </li>
            <li class="h-full overflow-hidden">
                <input type="radio" id="auto_theme" name="theme" class="sr-only peer" value="auto" onClick={onClickTheme} checked={theme === 'auto'} />
                <div class="flex peer-checked:bg-white peer-checked:text-black rounded-tr-md rounded-br-md h-full">
                    <label class="flex h-full px-2" htmlFor="auto_theme"><ContrastIcon class="w-4 h-4 inline-block m-2 my-auto" />Auto</label>
                </div>
            </li>
        </ul>
    );
}

export default ThemeSwitcher;