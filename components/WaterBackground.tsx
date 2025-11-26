import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

export const WaterBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;
    let animationFrameId: number;

    // Wave configuration
    // Each wave has: vertical offset (y), amplitude (amp), wavelength (len), speed, and color
    const waves = [
      { 
        y: 0.55, 
        amp: 40, 
        len: 0.003, 
        speed: 0.002, 
        // Light: Cyan-200/40. Dark: Cyan-900/30 (Deep Teal Base)
        color: theme === 'dark' ? 'rgba(22, 78, 99, 0.3)' : 'rgba(165, 243, 252, 0.4)' 
      },
      { 
        y: 0.65, 
        amp: 50, 
        len: 0.002, 
        speed: 0.003, 
        // Light: Cyan-100/50. Dark: Slate-800/60 (Body of water)
        color: theme === 'dark' ? 'rgba(30, 41, 59, 0.6)' : 'rgba(207, 250, 254, 0.5)' 
      },
      { 
        y: 0.6, 
        amp: 30, 
        len: 0.004, 
        speed: 0.001, 
        // Light: Cyan-400/20. Dark: Cyan-500/10 (Subtle Highlight)
        color: theme === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(34, 211, 238, 0.2)' 
      }
    ];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      waves.forEach((wave, index) => {
        ctx.beginPath();
        
        // Start point
        ctx.moveTo(0, height * wave.y);

        // Draw sine wave across width
        for (let x = 0; x <= width; x += 10) {
          // Complex sine interaction for "natural" feel
          const y = height * wave.y + 
                    Math.sin(x * wave.len + time * wave.speed) * wave.amp +
                    Math.sin(x * wave.len * 2 + time * wave.speed * 1.5) * (wave.amp / 3);
          ctx.lineTo(x, y);
        }

        // Close path at bottom to create a "filled" wave
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Base Layer Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-500" />
      
      {/* Animated Blobs for Ambient Depth */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30">
        {/* Blob 1: Teal - Top Left */}
        <div 
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob bg-teal-200 dark:bg-teal-900/30"
        />
        
        {/* Blob 2: Blue - Bottom Right */}
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob bg-blue-200 dark:bg-blue-900/30"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Canvas Layer for Crisp Water Ripples */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-60 dark:opacity-100"
      />

      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.02]" />
    </div>
  );
};