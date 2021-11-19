module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './src/template.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundSize: {
        'full-h-3': '100% .3rem'
      },
      backgroundImage: {
        swap: 'url(/assets/swap.svg)',
        logo: 'url(/assets/logo.svg)'
      },
      boxShadow: {
        'inset-thin': 'inset 0 2px 5px rgba(0,0,0,.2)'
      },
      minHeight: {
        'h-14': 'height: 3.5rem/* 56px */'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
