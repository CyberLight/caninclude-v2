import { h } from 'preact';

const Logo = () => {
    return (
        <div class="relative w-16 h-16 sm:w-28 sm:h-28 mb-5 text-center sm:mr-16 rounded-xl sm:rounded-3xl">
            <picture>
                <source srcset="/assets/logo-ny.svg" type="image/svg+xml" />
                <source srcset="/assets/logo-ny@1x.png, /assets/logo-ny@2x.png 2x, /assets/logo-ny@3x.png 3x" type="image/png" />
                <img 
                    width="112" 
                    height="112" 
                    class="object-contain h-full w-full text-current bg-gray-200 dark:bg-gray-700 rounded-xl sm:rounded-3xl" 
                    alt="caninclude logo" 
                    src="/assets/logo-ny@1x.png"
                />
            </picture>
        </div>
    );
}

export default Logo;