import { h } from 'preact';
import { useState } from 'preact/hooks';

const LogoLoading = () => (
    <div class="animate-pulse absolute left-0 right-0 w-full h-full dark:bg-purple-400 bg-purple-600 rounded-lg text-current" />
)

const Logo = () => {
    const [loading, setLoading] = useState(true);
    const onImageLoaded = () => setLoading(false);

    return (
        <div class="relative w-28 h-28 my-5">
            { loading && <LogoLoading /> }
            <picture>
                <source srcset="/assets/logo.svg" type="image/svg+xml" />
                <source srcset="/assets/logo@1x.png, /assets/logo@2x.png 2x, /assets/logo@3x.png 3x" type="image/png" />
                <img 
                    width="112" 
                    height="112" 
                    class="object-contain h-full w-full text-current" 
                    alt="caninclude logo" 
                    src="/assets/logo@1x.png" 
                    onLoad={onImageLoaded} 
                />
            </picture> 
        </div>
    );
}

export default Logo;