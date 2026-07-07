export function getChartTheme(isDark) {
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  return {
    annotationColor: isDark ? '#FFFFFF' : '#0F0F0F',
    font:   { family: 'Inter, sans-serif', size: 11 },
    axis:   { gridcolor: gridColor },
    legend: { font: { family: 'Inter, sans-serif', size: 11 } },
  };
}

/** Theme-aware semantic colours for JS/Plotly (mirrors quantio-theme.css) */
export function getSemanticColors(isDark) {
  return {
    danger:  isDark ? '#C05050' : '#DC2626',
    warn:    isDark ? '#C97830' : '#EA580C',
    success: isDark ? '#4EA878' : '#16A34A',
    teal:    isDark ? '#3ECFBE' : '#0F766E',
    gold:    '#6495ED',
    purple:  isDark ? '#3ECFBE' : '#0F766E',
  };
}
