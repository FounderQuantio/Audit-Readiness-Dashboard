import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export default function Plot({ data, layout, config, style }) {
  const el = useRef(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    Plotly.newPlot(node, data, layout, { responsive: true, displayModeBar: false, ...config });
    return () => { try { Plotly.purge(node); } catch (_) {} };
  }, [data, layout, config]);

  return <div ref={el} style={{ width: '100%', ...style }} />;
}
