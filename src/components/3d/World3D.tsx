import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// --- WebGL Support Check ---
function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

// Generate tiny 256x256 gradient canvas texture for iridescent envMap
function createGradientEnvTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 256, 256);
  grad.addColorStop(0, '#7C5CFF'); // violet
  grad.addColorStop(0.5, '#E14BFF'); // magenta
  grad.addColorStop(1, '#FFB547'); // amber
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  return texture;
}

// Live Canvas Texture generator for 3D Laptop Screen
class LaptopScreenTexture {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;
  currentMockupIndex: number = 0;
  lastSwitchTime: number = 0;

  mockups = [
    {
      title: 'SAVORIA BISTRO',
      subtitle: 'Artisan Dining & Michelin Selection',
      tag: 'SAMPLE CONCEPT • RESTAURANT',
      accent: '#FFB547',
      bgDark: '#0A0B14',
      badge: 'Michelin Guide 2026',
      cta: 'Book Table',
      items: ['Woodfired Pizza', 'Truffle Pasta', 'Craft Mocktails']
    },
    {
      title: 'PULSECARE CLINIC',
      subtitle: 'Multi-Specialty Medical Diagnostics',
      tag: 'SAMPLE CONCEPT • HEALTHCARE',
      accent: '#7C5CFF',
      bgDark: '#090B18',
      badge: 'NABH Certified',
      cta: 'Schedule OPD',
      items: ['Dr. A. Mehta (Cardio)', 'Online Slot Booking', 'Direct WhatsApp Hotline']
    },
    {
      title: 'THE GRAND OBEROI',
      subtitle: 'Royal Heritage Resort & Pool Villas',
      tag: 'SAMPLE CONCEPT • RESORT',
      accent: '#E14BFF',
      bgDark: '#0E0916',
      badge: '5-Star Luxury',
      cta: 'Explore Villas',
      items: ['Royal Pool Villa', 'Private Jacuzzi', 'Zero-Commission Booking']
    },
    {
      title: 'NEXORA STOREFRONT',
      subtitle: 'Next-Gen Headless E-Commerce',
      tag: 'SAMPLE CONCEPT • COMMERCE',
      accent: '#FFB547',
      bgDark: '#0C0F18',
      badge: 'High Conversion',
      cta: 'Instant Order',
      items: ['Live Inventory Sync', '1-Click UPI Payment', 'Automated Invoices']
    }
  ];

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1024;
    this.canvas.height = 640;
    this.ctx = this.canvas.getContext('2d')!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.render();
  }

  update(time: number) {
    if (time - this.lastSwitchTime > 4.0) {
      this.currentMockupIndex = (this.currentMockupIndex + 1) % this.mockups.length;
      this.lastSwitchTime = time;
      this.render();
      this.texture.needsUpdate = true;
    }
  }

  render() {
    const ctx = this.ctx;
    const m = this.mockups[this.currentMockupIndex];
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Background
    ctx.fillStyle = m.bgDark;
    ctx.fillRect(0, 0, w, h);

    // Browser Chrome Top Bar
    ctx.fillStyle = '#14162B';
    ctx.fillRect(0, 0, w, 64);

    // Window controls
    ctx.fillStyle = '#EF4444';
    ctx.beginPath(); ctx.arc(36, 32, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath(); ctx.arc(60, 32, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10B981';
    ctx.beginPath(); ctx.arc(84, 32, 8, 0, Math.PI * 2); ctx.fill();

    // URL Address pill
    ctx.fillStyle = '#07070D';
    ctx.beginPath();
    ctx.roundRect(140, 16, 440, 32, 16);
    ctx.fill();
    ctx.fillStyle = '#A9A7C2';
    ctx.font = '14px monospace';
    ctx.fillText('https://' + m.title.toLowerCase().replace(/\s+/g, '-') + '.nexora.tech', 160, 37);

    // Sample Concept Tag
    ctx.fillStyle = 'rgba(124, 92, 255, 0.25)';
    ctx.beginPath();
    ctx.roundRect(w - 280, 16, 250, 32, 8);
    ctx.fill();
    ctx.fillStyle = m.accent;
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(m.tag, w - 268, 37);

    // Hero banner inside mockup
    const grad = ctx.createRadialGradient(w/2, 260, 20, w/2, 260, 400);
    grad.addColorStop(0, m.accent + '33');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 64, w, h - 64);

    // Brand Title
    ctx.fillStyle = '#F5F3FF';
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText(m.title, 64, 160);

    // Subtitle
    ctx.fillStyle = '#A9A7C2';
    ctx.font = '20px sans-serif';
    ctx.fillText(m.subtitle, 64, 200);

    // Badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(64, 230, 200, 36, 18);
    ctx.fill();
    ctx.fillStyle = m.accent;
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('★ ' + m.badge, 84, 254);

    // Features List
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '16px sans-serif';
    m.items.forEach((item, idx) => {
      ctx.fillStyle = m.accent;
      ctx.fillText('✓', 64, 320 + idx * 36);
      ctx.fillStyle = '#F5F3FF';
      ctx.fillText(item, 92, 320 + idx * 36);
    });

    // CTA Button
    ctx.fillStyle = m.accent;
    ctx.beginPath();
    ctx.roundRect(64, 460, 220, 52, 14);
    ctx.fill();
    ctx.fillStyle = '#07070D';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(m.cta + ' →', 110, 492);
  }
}

export const World3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSupported] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && checkWebGLSupport();
  });

  useEffect(() => {
    if (!isSupported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // 2. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(dpr);

    // 3. Lighting (Midnight Aurora Palette: Violet & Amber)
    const ambientLight = new THREE.AmbientLight(0xf5f3ff, 0.8);
    scene.add(ambientLight);

    const violetLight = new THREE.PointLight(0x7C5CFF, 4, 35);
    violetLight.position.set(-6, 4, 8);
    scene.add(violetLight);

    const amberLight = new THREE.PointLight(0xFFB547, 4, 35);
    amberLight.position.set(6, -4, 8);
    scene.add(amberLight);

    const magentaLight = new THREE.DirectionalLight(0xE14BFF, 1.2);
    magentaLight.position.set(0, 8, 4);
    scene.add(magentaLight);

    const gradientEnvMap = createGradientEnvTexture();

    // Iridescent Glass Material
    const iridescentGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x151629,
      metalness: 0.15,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      iridescence: 0.85,
      iridescenceIOR: 1.35,
      transparent: true,
      opacity: 0.82,
      envMap: gradientEnvMap,
      envMapIntensity: 1.4,
    });

    // Wireframe Materials
    const violetWireMat = new THREE.MeshBasicMaterial({ color: 0x7C5CFF, wireframe: true, transparent: true, opacity: 0.35 });
    const amberWireMat = new THREE.MeshBasicMaterial({ color: 0xFFB547, wireframe: true, transparent: true, opacity: 0.35 });

    // ==========================================
    // MODULE 1: HERO (y = 0)
    // ==========================================
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // 1A. Floating 3D Laptop built from primitives
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(3.4, 0, 0);

    // Laptop Base
    const baseGeo = new THREE.BoxGeometry(4.8, 0.14, 3.2);
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x0E0F1C, metalness: 0.85, roughness: 0.25 });
    const laptopBase = new THREE.Mesh(baseGeo, chassisMat);
    laptopBase.position.y = -0.07;
    laptopGroup.add(laptopBase);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(1.4, 0.02, 0.9);
    const trackpadMat = new THREE.MeshStandardMaterial({ color: 0x151629, metalness: 0.5, roughness: 0.5 });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, 0.01, 0.8);
    laptopGroup.add(trackpad);

    // Keyboard recess
    const kbGeo = new THREE.BoxGeometry(4.2, 0.02, 1.6);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x07070D, metalness: 0.3, roughness: 0.6 });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(0, 0.01, -0.45);
    laptopGroup.add(keyboard);

    // Screen Lid (Tilted back ~14 degrees)
    const screenLidGroup = new THREE.Group();
    screenLidGroup.position.set(0, 0, -1.6);
    screenLidGroup.rotation.x = -Math.PI * 0.08;

    const lidGeo = new THREE.BoxGeometry(4.8, 3.1, 0.1);
    const lidMesh = new THREE.Mesh(lidGeo, chassisMat);
    lidMesh.position.set(0, 1.55, -0.05);
    screenLidGroup.add(lidMesh);

    // Screen Texture
    const laptopScreen = new LaptopScreenTexture();
    const screenGeo = new THREE.PlaneGeometry(4.5, 2.8);
    const screenMat = new THREE.MeshBasicMaterial({ map: laptopScreen.texture });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.55, 0.01);
    screenLidGroup.add(screenMesh);

    laptopGroup.add(screenLidGroup);
    heroGroup.add(laptopGroup);

    // 1B. 4-5 Orbiting Glass Shapes at different depths
    const orbitingShapes: { mesh: THREE.Mesh; speed: number; rotSpeed: { x: number; y: number }; initPos: [number, number, number] }[] = [];

    // Torus
    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.2, 16, 36), iridescentGlassMat);
    torus.position.set(1.2, 2.4, 1.8);
    heroGroup.add(torus);
    orbitingShapes.push({ mesh: torus, speed: 0.9, rotSpeed: { x: 0.01, y: 0.015 }, initPos: [1.2, 2.4, 1.8] });

    // Icosahedron
    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(0.65, 0), iridescentGlassMat);
    ico.position.set(5.8, -1.8, 1.4);
    heroGroup.add(ico);
    orbitingShapes.push({ mesh: ico, speed: 0.7, rotSpeed: { x: -0.01, y: 0.02 }, initPos: [5.8, -1.8, 1.4] });

    // Rounded Cube (Wireframe + Physical core)
    const cubeGroup = new THREE.Group();
    const cubeCore = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), iridescentGlassMat);
    const cubeWire = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), amberWireMat);
    cubeGroup.add(cubeCore);
    cubeGroup.add(cubeWire);
    cubeGroup.position.set(5.6, 2.0, -1.2);
    heroGroup.add(cubeGroup);
    orbitingShapes.push({ mesh: cubeGroup as unknown as THREE.Mesh, speed: 0.85, rotSpeed: { x: 0.015, y: -0.01 }, initPos: [5.6, 2.0, -1.2] });

    // Glowing Ring
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.9, 32), violetWireMat);
    ring.position.set(1.4, -2.2, 1.0);
    heroGroup.add(ring);
    orbitingShapes.push({ mesh: ring, speed: 0.75, rotSpeed: { x: 0.02, y: 0.01 }, initPos: [1.4, -2.2, 1.0] });

    // 1C. Extruded 3D "N" Logo Shape (THREE.Shape + ExtrudeGeometry, no font loading)
    const nShape = new THREE.Shape();
    nShape.moveTo(0, 0);
    nShape.lineTo(0.5, 0);
    nShape.lineTo(0.5, 1.2);
    nShape.lineTo(1.6, 0);
    nShape.lineTo(2.1, 0);
    nShape.lineTo(2.1, 2.2);
    nShape.lineTo(1.6, 2.2);
    nShape.lineTo(1.6, 1.0);
    nShape.lineTo(0.5, 2.2);
    nShape.lineTo(0, 2.2);
    nShape.closePath();

    const nGeo = new THREE.ExtrudeGeometry(nShape, {
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 3,
    });
    nGeo.center();

    const nMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFB547,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
      envMap: gradientEnvMap,
      envMapIntensity: 2.0
    });
    const nLogoMesh = new THREE.Mesh(nGeo, nMat);
    nLogoMesh.position.set(-5.0, 1.8, -1.5);
    nLogoMesh.scale.set(0.85, 0.85, 0.85);
    heroGroup.add(nLogoMesh);

    // 1D. Cursor-Reactive Particle Field (~400 instanced points)
    const particleCount = 400;
    const pGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const pMat = new THREE.MeshBasicMaterial({ color: 0xE14BFF, transparent: true, opacity: 0.65 });
    const instancedParticles = new THREE.InstancedMesh(pGeo, pMat, particleCount);

    const dummy = new THREE.Object3D();
    const pHomePositions: THREE.Vector3[] = [];
    const pCurrentPositions: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 8 - 1;
      pHomePositions.push(new THREE.Vector3(x, y, z));
      pCurrentPositions.push(new THREE.Vector3(x, y, z));
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      instancedParticles.setMatrixAt(i, dummy.matrix);
    }
    instancedParticles.instanceMatrix.needsUpdate = true;
    heroGroup.add(instancedParticles);

    // ==========================================
    // MODULE 2: INDUSTRIES (y = -26) Floating Glass Spheres
    // ==========================================
    const industriesGroup = new THREE.Group();
    industriesGroup.position.y = -26;
    scene.add(industriesGroup);

    const driftingSpheres: { mesh: THREE.Mesh; speedY: number; speedRot: number }[] = [];
    for (let i = 0; i < 9; i++) {
      const radius = 0.5 + Math.random() * 0.7;
      const sGeo = new THREE.SphereGeometry(radius, 20, 20);
      const sMesh = new THREE.Mesh(sGeo, iridescentGlassMat);
      sMesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      );
      industriesGroup.add(sMesh);
      driftingSpheres.push({
        mesh: sMesh,
        speedY: 0.2 + Math.random() * 0.4,
        speedRot: 0.005 + Math.random() * 0.01,
      });
    }

    // ==========================================
    // MODULE 3: HOW WE WORK (y = -54) 3D Glowing Helix / Path
    // ==========================================
    const howWeWorkGroup = new THREE.Group();
    howWeWorkGroup.position.y = -54;
    scene.add(howWeWorkGroup);

    // Helix Curve
    const helixPoints: THREE.Vector3[] = [];
    const totalHelixSteps = 150;
    for (let i = 0; i <= totalHelixSteps; i++) {
      const theta = (i / totalHelixSteps) * Math.PI * 6;
      const r = 4.2;
      const x = Math.cos(theta) * r;
      const y = (i / totalHelixSteps) * 10 - 5;
      const z = Math.sin(theta) * r * 0.6;
      helixPoints.push(new THREE.Vector3(x, y, z));
    }
    const helixCurveGeo = new THREE.BufferGeometry().setFromPoints(helixPoints);
    const helixLineMat = new THREE.LineBasicMaterial({ color: 0xFFB547, transparent: true, opacity: 0.65 });
    const helixLine = new THREE.Line(helixCurveGeo, helixLineMat);
    howWeWorkGroup.add(helixLine);

    // 5 Glowing Nodes along the helix
    const stepNodes: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const idx = Math.floor((i / 4) * totalHelixSteps);
      const nodePos = helixPoints[idx];
      const nodeGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x7C5CFF,
        emissive: 0x7C5CFF,
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.2
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(nodePos);
      howWeWorkGroup.add(nodeMesh);
      stepNodes.push(nodeMesh);
    }

    // ==========================================
    // MODULE 4: FINAL CTA / CONTACT (y = -70) Wireframe Globe
    // ==========================================
    const ctaGlobeGroup = new THREE.Group();
    ctaGlobeGroup.position.set(0, -70, 0);
    scene.add(ctaGlobeGroup);

    // Rotating Wireframe Globe
    const globeGeo = new THREE.SphereGeometry(3.6, 24, 24);
    const globeMesh = new THREE.Mesh(globeGeo, violetWireMat);
    ctaGlobeGroup.add(globeMesh);

    // Surface Glowing Points
    const globePointsMat = new THREE.PointsMaterial({ color: 0xFFB547, size: 0.08, transparent: true, opacity: 0.85 });
    const globePoints = new THREE.Points(new THREE.SphereGeometry(3.64, 32, 32), globePointsMat);
    ctaGlobeGroup.add(globePoints);

    // Concentric Ring Pulses
    const outerRing = new THREE.Mesh(new THREE.RingGeometry(4.2, 4.3, 64), amberWireMat);
    outerRing.rotation.x = Math.PI / 2.3;
    ctaGlobeGroup.add(outerRing);

    // ==========================================
    // MODULE 5: FOOTER (y = -86) Gentle Rising Particles
    // ==========================================
    const footerParticlesGroup = new THREE.Group();
    footerParticlesGroup.position.y = -86;
    scene.add(footerParticlesGroup);

    const footerPointsCount = 60;
    const footerGeo = new THREE.BufferGeometry();
    const footerCoords = new Float32Array(footerPointsCount * 3);
    for (let i = 0; i < footerPointsCount; i++) {
      footerCoords[i * 3] = (Math.random() - 0.5) * 18;
      footerCoords[i * 3 + 1] = (Math.random() - 0.5) * 8;
      footerCoords[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    footerGeo.setAttribute('position', new THREE.BufferAttribute(footerCoords, 3));
    const footerMat = new THREE.PointsMaterial({ color: 0xFFB547, size: 0.1, transparent: true, opacity: 0.5 });
    const footerPoints = new THREE.Points(footerGeo, footerMat);
    footerParticlesGroup.add(footerPoints);

    // ==========================================
    // INTERACTION & SCROLL CAMERA RIG
    // ==========================================
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll tracking
    let targetCameraY = 0;
    let targetCameraX = 0;
    let currentScrollProgress = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      currentScrollProgress = scrollY / maxScroll;

      // Scroll camera trajectory: curve through Y=0 down to Y=-80
      targetCameraY = -currentScrollProgress * 84;
      targetCameraX = Math.sin(currentScrollProgress * Math.PI * 2) * 1.5;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Adaptive Performance Monitor (60fps cap & frame time check)
    let lastTime = performance.now();
    let slowFrames = 0;
    let animationFrameId: number;

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Check tab visibility
      if (document.hidden) return;

      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Adaptive quality: drop DPR if frame time exceeds 20ms
      if (delta > 0.02) {
        slowFrames++;
        if (slowFrames > 60 && dpr > 1.0) {
          dpr = 1.0;
          renderer.setPixelRatio(dpr);
        }
      } else {
        slowFrames = Math.max(0, slowFrames - 1);
      }

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Smooth camera glide
      camera.position.y += (targetCameraY - camera.position.y) * 0.07;
      camera.position.x += (targetCameraX + mouse.x * 0.6 - camera.position.x) * 0.07;
      camera.position.z = 14 + Math.sin(currentScrollProgress * Math.PI) * 2;
      camera.lookAt(0, camera.position.y, 0);

      const t = now * 0.001;

      // Update Laptop Screen Canvas
      laptopScreen.update(t);

      // Laptop subtle idle float + mouse tilt
      laptopGroup.position.y = Math.sin(t * 0.8) * 0.12;
      laptopGroup.rotation.y = mouse.x * 0.15;
      laptopGroup.rotation.x = -mouse.y * 0.1;

      // Orbiting shapes rotation & float
      orbitingShapes.forEach((item, idx) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.position.y = item.initPos[1] + Math.sin(t * item.speed + idx) * 0.15;
      });

      // Extruded "N" Logo slow rotation
      nLogoMesh.rotation.y = t * 0.35;
      nLogoMesh.position.y = 1.8 + Math.sin(t * 0.9) * 0.1;

      // Cursor-reactive particle field repulsion
      const pointer3D = new THREE.Vector3(mouse.x * 8, mouse.y * 5, 0);
      for (let i = 0; i < particleCount; i++) {
        const home = pHomePositions[i];
        const curr = pCurrentPositions[i];
        const dist = curr.distanceTo(pointer3D);

        if (dist < 3.2) {
          const repelDir = curr.clone().sub(pointer3D).normalize();
          const repelForce = (3.2 - dist) * 0.12;
          curr.add(repelDir.multiplyScalar(repelForce));
        } else {
          // Spring back to home
          curr.lerp(home, 0.04);
        }

        dummy.position.copy(curr);
        dummy.updateMatrix();
        instancedParticles.setMatrixAt(i, dummy.matrix);
      }
      instancedParticles.instanceMatrix.needsUpdate = true;

      // Industries spheres parallax drift
      driftingSpheres.forEach((item) => {
        item.mesh.rotation.x += item.speedRot;
        item.mesh.rotation.y += item.speedRot;
      });

      // How We Work helix progress draw
      const progressInHW = Math.max(0, Math.min(1, (currentScrollProgress - 0.6) / 0.2));
      const drawCount = Math.floor(progressInHW * totalHelixSteps);
      helixCurveGeo.setDrawRange(0, drawCount);

      // Final CTA globe rotation
      ctaGlobeGroup.rotation.y = t * 0.2;
      outerRing.rotation.z = -t * 0.15;

      // Footer particles rise
      const posAttr = footerGeo.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < footerPointsCount; i++) {
        arr[i * 3 + 1] += 0.015;
        if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 4. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      gradientEnvMap.dispose();
    };
  }, [isSupported]);

  if (!isSupported) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ willChange: 'transform' }}
    />
  );
};

export default World3D;
