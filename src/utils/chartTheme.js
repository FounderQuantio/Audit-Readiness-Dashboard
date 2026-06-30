export function getChartTheme(isDark) {
  const textColor   = isDark ? '#B0B8C8' : '#374151';
  const gridColor   = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const legendColor = isDark ? '#C8D0DC' : '#1F2937';
  const tickFont    = { family: 'Inter, sans-serif', size: 11, color: textColor };
  return {
    annotationColor: isDark ? '#FFFFFF' : '#0F0F0F',
    font:   { family: 'Inter, sans-serif', size: 11, color: textColor },
    axis:   { color: textColor, gridcolor: gridColor, tickfont: tickFont },
    legend: { font: { color: legendColor, family: 'Inter, sans-serif', size: 11 } },
  };
}

/** Theme-aware semantic colours for JS/Plotly (mirrors quantio-theme.css) */
export function getSemanticColors(isDark) {
  return {
    danger:  isDark ? '#C05050' : '#DC2626',
    warn:    isDark ? '#C97830' : '#EA580C',
    success: isDark ? '#4EA878' : '#16A34A',
    teal:    isDark ? '#2DD4BF' : '#0D9488',
    gold:    '#C9A84C',
    purple:  isDark ? '#2DD4BF' : '#0D9488',
  };
}
