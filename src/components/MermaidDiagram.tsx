// project/src/components/MermaidDiagram.tsx
import React, { useEffect } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string; // Mermaid chart definition
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, [chart]);

  return (
    <div className="mermaid">
      {chart}
    </div>
  );
};

export default MermaidDiagram;