const plugin = require('tailwindcss/plugin');

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
        content: 'calc(100vh - 3.5rem - 3.5rem)'
      },
      maxWidth: {
        '1/2': '50%'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('peer-checked-fch', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.peer:checked ~ .${e(`peer-checked-fch${separator}${className}`)} > :first-child`
        })
      }),
      addVariant('peer-not-checked-lch', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.peer:not(:checked) ~ .${e(`peer-not-checked-lch${separator}${className}`)} > :last-child`
        })
      })
    })
  ],
}
