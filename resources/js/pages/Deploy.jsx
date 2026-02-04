import MermaidDiagram from '@/components/Diagram';

export default function Arquitectura() {
  return (
    <div className="min-h-screen bg-[#0f0f11] text-[#e0e0e0] p-5">
      <h1 className="text-center text-[#60a5fa] text-3xl mb-8 text-white bg-dark">
        Laravel + Inertia.js + React + Nginx<br/>
        on a Single EC2 Instance Architecture
      </h1>
      
      <MermaidDiagram />
    </div>
  );
}