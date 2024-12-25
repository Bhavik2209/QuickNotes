import React, { useEffect } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#6366f1',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#818cf8',
        lineColor: '#818cf8',
        secondaryColor: '#818cf8',
        tertiaryColor: '#1f2937'
      }
    });
    mermaid.contentLoaded();
  }, [chart]);

  return (
    <div className="mermaid bg-gray-800 p-6 rounded-lg overflow-x-auto">
      {chart}
    </div>
  );
};

export default MermaidDiagram;