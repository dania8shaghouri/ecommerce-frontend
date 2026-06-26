/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#006ce1",
        primaryHover: "#0059b3",
        primaryDark: "#004494",

        background: "#f5f7fb",
        surface: "#ffffff",

        sidebar: "#0f172a",
        sidebarHover: "#1e293b",

        border: "#e2e8f0",

        textPrimary: "#0f172a",
        textSecondary: "#64748b",

        success: "#16a34a",
        warning: "#f59e0b",
        danger: "#dc2626",
        info: "#0ea5e9",
      },

      boxShadow: {
        card: "0 2px 10px rgba(15, 23, 42, 0.06)",
        dropdown: "0 10px 30px rgba(15, 23, 42, 0.12)",
      },

      borderRadius: {
        card: "20px",
      },

      spacing: {
        sidebar: "280px",
        topbar: "72px",
      },

      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(-5px)",
          },

          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        slideIn: {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)",
          },

          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.2s ease-out",
        slideIn: "slideIn 0.25s ease-out",
      },
    },
  },

  plugins: [],
};
