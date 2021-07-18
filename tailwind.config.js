module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'spartan': []
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      borderRadius: ['checked']
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/custom-forms')
  ],
}
