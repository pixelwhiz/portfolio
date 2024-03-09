/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/App.tsx"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },
      },
      animation: {
        'slide-in': 'slideIn ease-out duration-300',
        'slide-out': 'slideOut ease-in duration-300',
      },
      colors: {
        "discord_dnd": '#f54848',
        "discord_idle": '#fda81a',
        "discord_offline": '#707a87',
        "discord_online": '#43b581'
      },
    },
  },
  plugins: [require("daisyui")],
}

