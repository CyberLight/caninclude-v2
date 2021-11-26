import { h } from 'preact';
import SettingsIcon from '../icons/settings';

const mapLine = (line, loading, clickHandler) => (
    <span class="inline-block border p-1 border-gray-900 dark:border-gray-500 space-x-2 rounded-md whitespace-nowrap w-full">
        <a href={line.href} class="h-full inline-block text-yellow-700 dark:text-yellow-500 align-top">{line.text}</a>
        <label class="inline-block relative w-12 h-6 select-none cursor-pointer align-top">
            <input type="checkbox" name={line.hashText} class="sr-only peer" onClick={clickHandler} disabled={loading} />
            <span class="h-6 w-6 border-4 absolute z-10 rounded-full bg-white transition-transform duration-300 ease-in-out flex justify-center items-centerborder-gray-100 peer-checked:translate-x-6 border-gray-500 peer-checked:border-green-400" />
            <span class="h-full w-full absolute left-0 top-0 rounded-full bg-gray-500 peer-checked:bg-green-400" />
        </label>
    </span>
);

const TagSettings = ({ id, loading=false, lines=[], clickHandler } = {}) => (
    <div class="absolute right-0 top-0 flex flex-col items-end">
        <input id={id} type="checkbox" class="peer sr-only" />
        <label htmlFor={id} class="block w-8 h-8 mx-2 mt-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-600 peer-checked:bg-gray-50 dark:peer-checked:bg-gray-900">
            <SettingsIcon />
        </label>
        <ul class="hidden z-10 flex-col space-y-2 p-2 mx-2 bg-gray-50 dark:bg-gray-900 rounded-xl peer-checked:flex shadow-md">
            { lines.map((line) => mapLine(line, loading, clickHandler)) }
        </ul>
    </div>
);

export default TagSettings;