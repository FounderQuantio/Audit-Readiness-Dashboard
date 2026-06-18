import { useTheme } from '../useTheme';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 12px',
        background: 'var(--qg-gold-tint-2)',
        border: '1px solid var(--qg-gold-border)',
        borderRadius: 'var(--qg-radius-pill)',
        cursor: 'pointer',
        fontFamily: 'var(--qg-font)',
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--qg-gold)',
        letterSpacing: '0.3px',
        transition: 'var(--qg-ease)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--qg-gold-tint-1)';
        e.currentTarget.style.borderColor = 'var(--qg-gold-border-h)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--qg-gold-tint-2)';
        e.currentTarget.style.borderColor = 'var(--qg-gold-border)';
      }}
    >
      {isDark ? '☀ Light' : '☾ Dark'}
    </button>
  );
}
