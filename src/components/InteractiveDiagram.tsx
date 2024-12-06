import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface DiagramProps {
  data: {
    nodes: { id: string; label: string; type?: string }[];
    links: { source: string; target: string; label?: string }[];
  };
}

const InteractiveDiagram: React.FC<DiagramProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;

    // Create a color scale for node types
    const colorScale = d3.scaleOrdinal()
      .domain(['process', 'decision', 'start', 'end'])
      .range(['#4a90e2', '#f39c12', '#2ecc71', '#e74c3c']);

    // Create a simulation for node positioning
    const simulation = d3.forceSimulation(data.nodes)
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink(data.links).id(d => (d as any).id).distance(150));

    // Create link elements
    const link = svg.append('g')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Create link labels
    const linkLabel = svg.append('g')
      .selectAll('text')
      .data(data.links)
      .enter()
      .append('text')
      .text(d => d.label || '')
      .attr('font-size', 10)
      .attr('fill', '#666')
      .attr('text-anchor', 'middle');

    // Create node elements
    const node = svg.append('g')
      .selectAll('g')
      .data(data.nodes)
      .enter()
      .append('g')
      .call(d3.drag<SVGGElement, any>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Add circles to nodes
    node.append('circle')
      .attr('r', 30)
      .attr('fill', d => colorScale(d.type || 'default') as string)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Add labels to nodes
    node.append('text')
      .text(d => d.label)
      .attr('font-size', 10)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', 'white');

    // Update positions on each tick of the simulation
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      linkLabel
        .attr('x', d => ((d.source as any).x + (d.target as any).x) / 2)
        .attr('y', d => ((d.source as any).y + (d.target as any).y) / 2);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth * 0.9;
      const newHeight = window.innerHeight * 0.6;
      setDimensions({ width: newWidth, height: newHeight });
      svg.attr('width', newWidth).attr('height', newHeight);
      simulation.force('center', d3.forceCenter(newWidth / 2, newHeight / 2));
      simulation.restart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      simulation.stop();
    };
  }, [data, dimensions]);

  return (
    <div className="diagram-container">
      <svg 
        ref={svgRef} 
        width={dimensions.width} 
        height={dimensions.height} 
        className="w-full bg-gray-900 rounded-xl"
      />
    </div>
  );
};

export default InteractiveDiagram;