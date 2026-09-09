import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  text?: string;
  isBinary?: boolean;
  alpha: number;
}

export const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Tech tokens to float in the matrix background
    const techSnippets = [
      '01100011', '01100011', '01110011', 'WMSU', 'CCS', 'O(1)', 'O(n log n)',
      '0x7F', '0x2A', '0xCCS', '01010101', '11001100', '0xFF', 'ptr->next',
      'CS311', 'CS312', 'AI/ML', 'KERNEL_OK', 'AUTH_256', '01101', 'SYN_ACK'
    ];

    // Create particles
    const particleCount = Math.min(Math.floor((width * height) / 18000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isText = Math.random() > 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 1,
        text: isText ? techSnippets[Math.floor(Math.random() * techSnippets.length)] : undefined,
        isBinary: isText,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particle connections (circuit lines)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.18;
            ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse proximity reaction
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100) {
          const force = (1 - mdist / 100) * 0.5;
          p.x -= (mdx / mdist) * force * 2;
          p.y -= (mdy / mdist) * force * 2;
        }

        if (p.text) {
          ctx.font = '10px "Fira Code", monospace';
          ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha * 0.75})`;
          ctx.fillText(p.text, p.x, p.y);
        } else {
          ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dark Ambient Grid & Radial Glows */}
      <div className="absolute inset-0 bg-[#040906]" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-950/40 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-[-5%] w-[450px] h-[450px] bg-teal-900/20 rounded-full blur-[130px] pointer-events-none" />
      
      {/* Live Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-25" />
    </div>
  );
};
