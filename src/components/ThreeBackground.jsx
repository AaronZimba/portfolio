import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ThreeBackground({ darkMode }) {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear any existing canvas first
    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
    }

    // Set scene background based on darkMode
    if (darkMode) {
      scene.background = new THREE.Color(0x0f172a); // Dark blue
    } else {
      scene.background = new THREE.Color(0xe0f2fe); // Light blue
    }

    // Professional particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1800;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const sizeArray = new Float32Array(particlesCount);
    const originalPositions = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i += 3) {
      // Position - more organized distribution
      const radius = 8 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      posArray[i] = x;
      posArray[i + 1] = y;
      posArray[i + 2] = z;
      
      // Store original positions for mouse interaction
      originalPositions[i] = x;
      originalPositions[i + 1] = y;
      originalPositions[i + 2] = z;
      
      // Professional color palette
      const isAccent = Math.random() < 0.1;
      
      if (darkMode) {
        if (isAccent) {
          colorArray[i] = Math.random() > 0.5 ? 0.9 : 0.0;
          colorArray[i + 1] = Math.random() > 0.5 ? 0.7 : 0.9;
          colorArray[i + 2] = Math.random() > 0.5 ? 0.1 : 0.9;
        } else {
          const blueTone = 0.6 + Math.random() * 0.3;
          const purpleTone = 0.5 + Math.random() * 0.4;
          colorArray[i] = purpleTone * 0.8;
          colorArray[i + 1] = purpleTone * 0.6;
          colorArray[i + 2] = blueTone;
        }
      } else {
        if (isAccent) {
          colorArray[i] = Math.random() > 0.5 ? 0.2 : 0.0;
          colorArray[i + 1] = Math.random() > 0.5 ? 0.4 : 0.8;
          colorArray[i + 2] = Math.random() > 0.5 ? 0.8 : 0.4;
        } else {
          const blueTone = 0.3 + Math.random() * 0.4;
          const tealTone = 0.4 + Math.random() * 0.3;
          colorArray[i] = blueTone * 0.6;
          colorArray[i + 1] = tealTone;
          colorArray[i + 2] = blueTone;
        }
      }
      
      sizeArray[i / 3] = 0.02 + Math.random() * 0.03;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: darkMode ? 0.4 : 0.3,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Professional geometric shapes - increased number of spheres
    const geometries = [
      new THREE.OctahedronGeometry(0.3, 0),
      new THREE.IcosahedronGeometry(0.25, 1),
      new THREE.TorusGeometry(0.4, 0.1, 12, 24),
      new THREE.SphereGeometry(0.2, 16, 16),
      new THREE.SphereGeometry(0.18, 12, 12), // Additional smaller sphere
      new THREE.SphereGeometry(0.22, 20, 20), // Additional medium sphere
      new THREE.SphereGeometry(0.15, 10, 10)  // Additional small sphere
    ];

    const shapes = [];
    geometries.forEach(geometry => {
      const hue = darkMode ? 0.6 + Math.random() * 0.3 : 0.5 + Math.random() * 0.2;
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(hue, 0.6, darkMode ? 0.6 : 0.5),
        transparent: true,
        opacity: 0.4,
        shininess: 80,
        specular: new THREE.Color(0x111111)
      });

      const mesh = new THREE.Mesh(geometry, material);
      const originalX = (Math.random() - 0.5) * 10;
      const originalY = (Math.random() - 0.5) * 10;
      const originalZ = (Math.random() - 0.5) * 6;
      
      mesh.position.set(originalX, originalY, originalZ);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      mesh.userData = {
        speed: Math.random() * 0.01 + 0.003,
        rotationSpeed: Math.random() * 0.01 + 0.003,
        floatSpeed: Math.random() * 0.005 + 0.002,
        originalPosition: new THREE.Vector3(originalX, originalY, originalZ),
        mouseInfluence: 0
      };
      
      scene.add(mesh);
      shapes.push(mesh);
    });

    // Add a few more standalone spheres for better distribution
    for (let i = 0; i < 3; i++) {
      const sphereGeometry = new THREE.SphereGeometry(0.16 + Math.random() * 0.08, 14, 14);
      const hue = darkMode ? 0.6 + Math.random() * 0.3 : 0.5 + Math.random() * 0.2;
      const sphereMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(hue, 0.5, darkMode ? 0.55 : 0.45),
        transparent: true,
        opacity: 0.35,
        shininess: 70,
        specular: new THREE.Color(0x0a0a0a)
      });

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      const originalX = (Math.random() - 0.5) * 12;
      const originalY = (Math.random() - 0.5) * 12;
      const originalZ = (Math.random() - 0.5) * 8;
      
      sphere.position.set(originalX, originalY, originalZ);
      sphere.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      sphere.userData = {
        speed: Math.random() * 0.01 + 0.002,
        rotationSpeed: Math.random() * 0.01 + 0.002,
        floatSpeed: Math.random() * 0.005 + 0.001,
        originalPosition: new THREE.Vector3(originalX, originalY, originalZ),
        mouseInfluence: 0
      };
      
      scene.add(sphere);
      shapes.push(sphere);
    }

    // Professional lighting
    const ambientLight = new THREE.AmbientLight(
      darkMode ? 0x404060 : 0x6080a0, 
      darkMode ? 0.3 : 0.4
    );
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      darkMode ? 0x8B5CF6 : 0x3B82F6, 
      darkMode ? 0.6 : 0.7
    );
    directionalLight.position.set(3, 4, 3);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(
      darkMode ? 0x06B6D4 : 0x10B981, 
      0.3
    );
    pointLight.position.set(-3, -2, 2);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 7;

    // Enhanced mouse interaction
    const mouse = { 
      x: 0, 
      y: 0,
      velocityX: 0,
      velocityY: 0,
      prevX: 0,
      prevY: 0
    };
    
    const handleMouseMove = (event) => {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Calculate mouse velocity
      mouse.velocityX = mouse.x - mouse.prevX;
      mouse.velocityY = mouse.y - mouse.prevY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Mouse position for force field effect
    const mouseForce = new THREE.Vector3();

    // Smooth animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Calculate mouse force field
      const mouseStrength = Math.sqrt(mouse.velocityX * mouse.velocityX + mouse.velocityY * mouse.velocityY) * 10;
      mouseForce.set(mouse.velocityX * 2, mouse.velocityY * 2, 0);
      
      // Animate particles with mouse interaction
      const positions = particlesMesh.geometry.attributes.position.array;
      
      for(let i = 0; i < positions.length; i += 3) {
        const originalX = originalPositions[i];
        const originalY = originalPositions[i + 1];
        const originalZ = originalPositions[i + 2];
        
        // Current position
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Calculate distance from mouse force
        const particlePos = new THREE.Vector3(x, y, z);
        const distanceToMouse = particlePos.distanceTo(mouseForce);
        
        // Mouse repulsion effect
        if (distanceToMouse < 3) {
          const force = (3 - distanceToMouse) / 3;
          const direction = new THREE.Vector3()
            .subVectors(particlePos, mouseForce)
            .normalize()
            .multiplyScalar(force * mouseStrength * 0.1);
          
          positions[i] += direction.x;
          positions[i + 1] += direction.y;
          positions[i + 2] += direction.z * 0.5;
        }
        
        // Return to original position smoothly
        const returnSpeed = 0.05;
        positions[i] += (originalX - positions[i]) * returnSpeed;
        positions[i + 1] += (originalY - positions[i + 1]) * returnSpeed;
        positions[i + 2] += (originalZ - positions[i + 2]) * returnSpeed;
        
        // Gentle floating animation
        positions[i] += Math.sin(elapsedTime * 0.5 + originalY) * 0.001;
        positions[i + 1] += Math.cos(elapsedTime * 0.5 + originalX) * 0.001;
      }
      
      particlesMesh.geometry.attributes.position.needsUpdate = true;
      
      // Slow base rotation
      particlesMesh.rotation.y = elapsedTime * 0.02;
      particlesMesh.rotation.x = Math.sin(elapsedTime * 0.01) * 0.05;
      
      // Animate shapes with mouse interaction
      shapes.forEach(shape => {
        const originalPos = shape.userData.originalPosition;
        
        // Mouse influence on shapes
        const shapeDistance = new THREE.Vector3(shape.position.x, shape.position.y, 0)
          .distanceTo(new THREE.Vector3(mouse.x * 5, mouse.y * 5, 0));
        
        if (shapeDistance < 2) {
          shape.userData.mouseInfluence = Math.min(shape.userData.mouseInfluence + 0.1, 1);
          const force = (2 - shapeDistance) / 2;
          const pushDirection = new THREE.Vector3()
            .subVectors(shape.position, new THREE.Vector3(mouse.x * 5, mouse.y * 5, 0))
            .normalize()
            .multiplyScalar(force * 0.3);
          
          shape.position.x += pushDirection.x;
          shape.position.y += pushDirection.y;
        } else {
          shape.userData.mouseInfluence = Math.max(shape.userData.mouseInfluence - 0.05, 0);
        }
        
        // Return to original position
        const returnStrength = 0.1 * (1 - shape.userData.mouseInfluence);
        shape.position.x += (originalPos.x - shape.position.x) * returnStrength;
        shape.position.y += (originalPos.y - shape.position.y) * returnStrength;
        shape.position.z += (originalPos.z - shape.position.z) * returnStrength;
        
        // Enhanced rotation based on mouse movement
        const rotationBoost = 1 + (Math.abs(mouse.velocityX) + Math.abs(mouse.velocityY)) * 2;
        shape.rotation.x += shape.userData.rotationSpeed * 0.5 * rotationBoost;
        shape.rotation.y += shape.userData.speed * rotationBoost;
        
        // Scale effect based on mouse proximity
        const scaleEffect = 1 + shape.userData.mouseInfluence * 0.3;
        shape.scale.setScalar(scaleEffect);
        
        // Very subtle floating
        shape.position.y += Math.sin(elapsedTime * shape.userData.floatSpeed + originalPos.x) * 0.002;
      });

      // Camera movement based on mouse
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.01;
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.01;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
      renderer.dispose();
    };
  }, [darkMode]);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ 
        background: 'transparent'
      }}
    />
  );
}