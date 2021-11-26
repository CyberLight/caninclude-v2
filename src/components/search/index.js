import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';

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
                    onInput={onChildInput}
                    value={formData.child} />
            </p>
            <p>
                <label class="h-full">
                    <input type="checkbox" name="swap" class="peer sr-only" checked={swap} onClick={swapClick} />
                    <svg 
                        class="fill-current h-full peer-checked:text-pink-400 m-5 md:m-auto" 
                        width="28px" 
                        height="28px" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg">
                        <g data-name="Layer 2">
                            <g data-name="swap">
                                <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
                                <path d="M4 9h13l-1.6 1.2a1 1 0 0 0-.2 1.4 1 1 0 0 0 .8.4 1 1 0 0 0 .6-.2l4-3a1 1 0 0 0 0-1.59l-3.86-3a1 1 0 0 0-1.23 1.58L17.08 7H4a1 1 0 0 0 0 2z" />
                                <path d="M20 16H7l1.6-1.2a1 1 0 0 0-1.2-1.6l-4 3a1 1 0 0 0 0 1.59l3.86 3a1 1 0 0 0 .61.21 1 1 0 0 0 .79-.39 1 1 0 0 0-.17-1.4L6.92 18H20a1 1 0 0 0 0-2z" />
                            </g>
                        </g>
                    </svg>
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
                    onInput={onParentInput}
                    value={formData.parent} />
            </p>
            <p class="flex items-center h-10">
                <button class="bg-purple-600 text-gray-50 dark:text-current px-4 rounded-lg h-full mx-2">Go</button>
            </p>
            </form>
        </div>
    );
};

export default Search;
