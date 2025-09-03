/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        
        ngo: {
          color1: "#005B99", // Calm blue – trust, responsibility
          color2: "#007F5F", // Teal green – community, environment
          color3: "#F4A261", // Soft orange – approachability
          color4: "#E76F51", // Muted red-orange – action and energy
          color5: "#264653", // Deep navy – foundation and depth
          color6: "#2A9D8F", // Turquoise – health, environment
          color7: "#F7F7F7", // Clean white-gray – neutral background
          color8: "#C9D6DF", // Soft blue-gray – secondary content
        } 
      }
    },
  },
  plugins: [],
}