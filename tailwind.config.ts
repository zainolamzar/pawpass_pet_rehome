module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 0.6 },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in forwards',
      },
    },
  },
};
