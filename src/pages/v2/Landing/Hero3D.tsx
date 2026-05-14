import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const NeuralHuman = () => {
  const points = useRef<THREE.Points>(null!);
  
  // Create a stylized human-like silhouette using points
  const particlesCount = 4000;
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const sc = new Float32Array(particlesCount);
    for (let i = 0; i < particlesCount; i++) {
      // Shape points into a tall, slightly organic pillar (athlete silhouette)
      const phi = Math.acos(-1 + (2 * i) / particlesCount);
      const theta = Math.sqrt(particlesCount * Math.PI) * phi;
      
      const r = 1.2 + Math.random() * 0.4;
      pos[i * 3] = r * Math.cos(theta) * Math.sin(phi) * 0.5; // Width
      pos[i * 3 + 1] = (phi - Math.PI / 2) * 2; // Height
      pos[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi) * 0.5; // Depth
      
      sc[i] = Math.random();
    }
    return [pos, sc];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.1;
    // Breathing/Pulse effect
    points.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={particlesCount}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#3b82f6" intensity={2} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <NeuralHuman />
        </Float>

        {/* Cinematic Floor Reflection */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.8} transparent opacity={0.4} />
        </mesh>
      </Canvas>
    </div>
  );
};
