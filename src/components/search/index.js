import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import Swap from '../icons/swap';

const Search = () => {
    const [swap, setSwap] = useState(false);
    const [formData, setFormData] = useState({ child: '', parent: '' })
    const swapClick = () => { 
        const { child: parent, parent: child } = formData || {};
        setFormData({ parent, child });
        setSwap(!swap);
    };
    const onChildInput = (e) => setFormData({ ...formData, child: e.target.value });
    const onParentInput = (e) => setFormData({ ...formData, parent: e.target.value });
    const onSubmit = (e) => {
         e.preventDefault();
         const formData = new FormData(e.target);
         route(`/caninclude?${new URLSearchParams(formData)}`);
    };

    return (
        <div class="flex w-80 md:w-auto">
            <form class="flex flex-wrap justify-center items-center gap-1 my-5" onSubmit={onSubmit} action="/caninclude" method="GET" enctype="application/x-www-form-urlencoded">
            <p>
                <label htmlFor="child" class="sr-only w-7 px-4">Child</label>
                <input 
                    id="child" 
                    class="rounded border mx-2 p-2 shadow-inset-thin border-purple-100 dark:border-purple-600 border-b-purple-50 dark:border-b-purple-500 text-purple-900 dark:text-purple-100 bg-purple-300 dark:bg-purple-900 placeholder-purple-500 dark:placeholder-purple-300" 
                    name="child" 
                    type="text" 
                    placeholder="Child tag name"
                    autocomplete="off"
                    autofocus
                    onInput={onChildInput}
                    value={formData.child} />
            </p>
            <p class="h-10 md:h-full focus-within:border focus-within:rounded-md focus-within:border-blue-400">
                <input type="checkbox" id="swap" name="swap" class="peer sr-only" checked={swap} onClick={swapClick} />
                <label 
                    class="block px-2 w-14 h-full border border-purple-500 dark:border-gray-500 rounded-md focus-within:border-blue-400 peer-checked:bg-purple-600 peer-checked:text-white dark:peer-checked:bg-white dark:peer-checked:text-black sm:h-full" 
                    htmlFor="swap">
                    <Swap class="h-full mx-auto" />
                </label>
            </p>
            <p>
                <label htmlFor="parent" class="sr-only w-7 px-4">Parent</label>
                <input 
                    id="parent" 
                    class="rounded border mx-2 p-2 shadow-inset-thin border-purple-100 dark:border-purple-600 border-b-purple-50 dark:border-b-purple-500 text-purple-900 dark:text-purple-100 bg-purple-300 dark:bg-purple-900 placeholder-purple-500 dark:placeholder-purple-300" 
                    name="parent" 
                    type="text" 
                    placeholder="Parent tag name"
                    autocomplete="off"
                    onInput={onParentInput}
                    value={formData.parent} />
            </p>
            <p class="flex items-center h-10">
                <button class="bg-purple-600 text-gray-50 dark:text-current px-2 w-14 rounded-lg h-full">Go</button>
            </p>
            </form>
        </div>
    );
};

export default Search;
