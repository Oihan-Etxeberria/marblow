import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',                    // o 'default' según prefieras
  themeVariables: {
    fontFamily: 'system-ui, sans-serif',
    primaryColor: '#60a5fa',
    primaryTextColor: '#f3f4f6',
    secondaryColor: '#4b5563',
    lineColor: '#6b7280'
  }
});

export default function MermaidDiagram() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Tu diagrama completo aquí (cópialo tal cual)
    const diagramCode = `
graph TB
    subgraph Internet["🌐 Internet"]
        User["👤 User<br/>(Web Browser)"]
    end

    subgraph AWS["☁️ Amazon Web Services"]
        subgraph VPC["Virtual Private Cloud (VPC)"]
            subgraph EC2["📦 EC2 Instance<br/>(Ubuntu / Amazon Linux)"]
                subgraph WebServer["🌍 Web Server<br/>(Nginx / Apache)"]
                    Port80["Port 80/443<br/>(HTTP/HTTPS)"]
                end
                
                subgraph PHPRuntime["⚙️ PHP-FPM<br/>(PHP Runtime)"]
                    Laravel["🎯 Laravel Framework<br/>(Backend + Routing)"]
                    Inertia["🔄 Inertia.js<br/>(SPA Adapter)"]
                end
                
                subgraph Frontend["⚛️ Frontend Assets"]
                    React["React Components<br/>(Built with Vite)"]
                    CSS["CSS / Tailwind"]
                    JS["JavaScript Bundle"]
                end
                
                subgraph Storage["💾 Storage"]
                    SQLite["database.sqlite<br/>(Database)"]
                    Files["storage/<br/>(Uploaded Files)"]
                    Logs["logs/<br/>(Log Files)"]
                end
            end
            
            SG["🔒 Security Group<br/>(Firewall)"]
        end
        
        EIP["🌐 Elastic IP<br/>(Static Public IP)"]
    end

    User -->|"HTTPS Request"| EIP
    EIP -->|"Routes to"| SG
    SG -->|"Allows 80/443"| Port80
    Port80 -->|"Processes PHP"| Laravel
    Laravel <-->|"Read/Write"| SQLite
    Laravel -->|"Renders with"| Inertia
    Inertia -->|"Loads components"| React
    React -->|"Uses assets"| CSS
    React -->|"Executes"| JS
    Laravel <-->|"Manages"| Files["public/argazkiak<br>(Uploaded Files, e.g. Blower images)"]
    Laravel -->|"Writes"| Logs
    
    WebServer -.->|"Serves static files"| Frontend

    classDef internet fill:#1e3a5f,stroke:#60a5fa,stroke-width:2px,color:#e0f2fe
    classDef aws fill:#3c2a1e,stroke:#f59e0b,stroke-width:2px,color:#fef3c7
    classDef vpc fill:#1f2937,stroke:#6b7280
    classDef ec2 fill:#111827,stroke:#9ca3af
    classDef web fill:#14532d,stroke:#22c55e,color:#bbf7d0
    classDef php fill:#3f2c06,stroke:#f59e0b,color:#fde68a
    classDef frontend fill:#1e3a5f,stroke:#60a5fa,color:#bfdbfe
    classDef storage fill:#4c1d1d,stroke:#ef4444,color:#fecaca

    class Internet internet
    class AWS aws
    class VPC vpc
    class EC2 ec2
    class WebServer web
    class PHPRuntime php
    class Frontend frontend
    class Storage storage
    `;

    // Renderizamos manualmente
    mermaid.render('arquitectura-diagram', diagramCode).then(({ svg }) => {
      if (containerRef.current) {
        containerRef.current.innerHTML = svg;
        // Opcional: bindear eventos si los necesitas
        // mermaid.bindFunctions?.(containerRef.current);
      }
    }).catch(err => {
      console.error('Error rendering mermaid:', err);
      if (containerRef.current) {
        containerRef.current.innerHTML = '<p style="color: red;">Error al renderizar diagrama</p>';
      }
    });
  }, []); // Solo se ejecuta una vez al montar

  return (
    <div
      ref={containerRef}
      className="mermaid-container"
      style={{
        background: '#111114',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
        maxWidth: '1800px',
        margin: '0 auto',
        overflow: 'auto'
      }}
    />
  );
}