import { h } from 'preact';

const Logo = () => {
    return (
        <div class="relative w-16 h-16 sm:w-28 sm:h-28 mb-5 text-center">
            <picture>
                <source srcset="/assets/logo.svg" type="image/svg+xml" />
                <source srcset="/assets/logo@1x.png, /assets/logo@2x.png 2x, /assets/logo@3x.png 3x" type="image/png" />
                <img 
                    width="112" 
                    height="112" 
                    class="object-contain h-full w-full text-current bg-gray-200 dark:bg-gray-700 rounded-3xl" 
                    alt="caninclude logo" 
                    src="/assets/logo@1x.png"
                />
            </picture>
        </div>
    );
}

export default Logo;