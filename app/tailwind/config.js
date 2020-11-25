/*global module*/

module.exports = {
  purge: [],
  plugins: [
    require('@tailwindcss/ui'),
  ],
  theme: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1440px',
        },
      container: {
          center: true,
        },
      extend: {
        colors: {
          gray: {
            '100': '#f8f8f8',
            '200': '#eeeeee',
            '300': '#e0e0e0',
            '400': '#bdbdbd',
            '500': '#484848',
            '600': '#383838',
            '700': '#282828',
            '800': '#181818',
            '900': '#101010',
          }
        }
      }

  },

  variants: {},
}
