export function getChartTheme(isDark) {
  const textColor  = isDark ? 'rgba(255,255,255,0.50)' : 'rgba(0,0,0,0.50)';
  const gridColor  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
  const legendColor = isDark ? 'rgba(255,255,255,0.70)' : 'rgba(0,0,0,0.65)';
  return {
    annotationColor: isDark ? '#FFFFFF' : '#0F0F0F',
    font:   { family: 'Inter, sans-serif', size: 11, color: textColor },
    axis:   { color: textColor, gridcolor: gridColor },
    legend: { font: { color: legendColor } },
  };
}
