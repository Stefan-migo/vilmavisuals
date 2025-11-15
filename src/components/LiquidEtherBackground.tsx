import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LiquidEtherBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '0';
    container.appendChild(renderer.domElement);

    // Create liquid ether effect
    const geometry = new THREE.PlaneGeometry(20, 20, 64, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          float dist = distance(uv, uMouse);
          pos.z += sin(dist * 10.0 - uTime * 2.0) * 0.1;
          pos.z += sin(pos.x * 5.0 + uTime) * 0.05;
          pos.z += sin(pos.y * 5.0 + uTime * 1.5) * 0.05;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        uniform vec2 uMouse;

        void main() {
          vec2 uv = vUv;
          float dist = distance(uv, uMouse);
          
          vec3 color = vec3(0.0);
          
          // Create flowing liquid effect with more visible colors
          float wave1 = sin(uv.x * 8.0 + uTime * 1.5) * 0.5 + 0.5;
          float wave2 = sin(uv.y * 8.0 + uTime * 2.0) * 0.5 + 0.5;
          float wave3 = sin((uv.x + uv.y) * 6.0 + uTime * 2.5) * 0.5 + 0.5;
          
          // More visible colors - white/blue tones
          color = vec3(wave1 * 0.15, wave2 * 0.15, wave3 * 0.2);
          
          // Add mouse interaction
          float mouseInfluence = 1.0 - smoothstep(0.0, 0.4, dist);
          color += vec3(mouseInfluence * 0.3);
          
          // Base gradient for visibility
          color += vec3(0.08, 0.08, 0.12);
          
          // Make it more visible
          gl_FragColor = vec4(color, 0.5);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX / width;
      mouseRef.current.y = 1 - (event.clientY / height);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Check if mobile for performance optimization
    const isMobile = window.innerWidth < 768;
    
    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      // Slow down animation on mobile for better performance
      const timeMultiplier = isMobile ? 0.5 : 1;
      material.uniforms.uTime.value = elapsedTime * timeMultiplier;
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{ 
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    />
  );
};

export default LiquidEtherBackground;

