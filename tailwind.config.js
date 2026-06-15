/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': 'var(--bg-void)',
        'surface': 'var(--bg-surface)',
        'elevated': 'var(--bg-elevated)',
        'input': 'var(--bg-input)',
        'border': 'var(--border)',
        'border-dim': 'var(--border-dim)',
        'border-focus': 'var(--border-focus)',
        'amber': {
          DEFAULT: 'var(--amber)',
          dim: 'var(--amber-dim)',
          glow: 'var(--amber-glow)',
        },
        'risk': {
          high: 'var(--risk-high)',
          medium: 'var(--risk-medium)',
          low: 'var(--risk-low)',
          clean: 'var(--risk-clean)',
          suppressed: 'var(--risk-suppressed)',
        },
        'text': {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          data: 'var(--text-data)',
        },
        'ch': {
          upi: 'var(--ch-upi)',
          neft: 'var(--ch-neft)',
          rtgs: 'var(--ch-rtgs)',
          imps: 'var(--ch-imps)',
          atm: 'var(--ch-atm)',
          chq: 'var(--ch-chq)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
