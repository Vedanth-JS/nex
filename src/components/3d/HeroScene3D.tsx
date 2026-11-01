import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Central 3D Icosahedron Wireframe with Glowing Nodes
    const icosahedronGeo = new THREE.IcosahedronGeometry(7, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const icosahedron = new THREE.Mesh(icosahedronGeo, wireframeMat);
    scene.add(icosahedron);

    // Glowing Node Points on vertices
    const pointsMat = new THREE.PointsMaterial({
      color: 0x22D3EE,
      size: 0.18,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const icosahedronPoints = new THREE.Points(icosahedronGeo, pointsMat);
    scene.add(icosahedronPoints);

    // 2. Inner Torus Knot for high-tech geometry
    const torusGeo = new THREE.TorusKnotGeometry(4.2, 0.45, 120, 16);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x2563EB,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torusKnot);

    // 3. Orbiting Neon Rings
    const ringGeo = new THREE.RingGeometry(11, 11.08, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22D3EE,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat.clone());
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    (ring2.material as THREE.MeshBasicMaterial).color.setHex(0xA855F7);
    scene.add(ring2);

    // 4. Interactive 3D Starfield Particles
    const particlesCount = 450;
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color(0x8B5CF6);
    const color2 = new THREE.Color(0x22D3EE);
    const color3 = new THREE.Color(0xFFFFFF);

    for (let i = 0; i < particlesCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const mixedColor = Math.random() > 0.5 ? color1 : Math.random() > 0.3 ? color2 : color3;
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(particlesGeo, particlesMat);
    scene.add(starField);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0008;
      mouseY = (e.clientY - windowHalfY) * 0.0008;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate geometries
      icosahedron.rotation.x = elapsedTime * 0.08 + targetY * 2;
      icosahedron.rotation.y = elapsedTime * 0.12 + targetX * 2;
      icosahedronPoints.rotation.x = icosahedron.rotation.x;
      icosahedronPoints.rotation.y = icosahedron.rotation.y;

      torusKnot.rotation.x = -elapsedTime * 0.1 + targetY;
      torusKnot.rotation.y = -elapsedTime * 0.15 + targetX;

      ring1.rotation.z = elapsedTime * 0.06;
      ring2.rotation.z = -elapsedTime * 0.05;

      starField.rotation.y = elapsedTime * 0.02 + targetX * 0.5;
      starField.rotation.x = targetY * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-90"
      aria-hidden="true"
    />
  );
};
