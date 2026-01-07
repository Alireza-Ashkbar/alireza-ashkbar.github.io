import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export function FaultModal3D({ fault, onClose }) {
  return (
    <group position={[-35, 50, -80]} rotation={[0, Math.PI / 5, 0]} scale={30}>
      <mesh>
        <planeGeometry args={[2.1, 1.3]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      <Text position={[0, 0.3, 0.01]} fontSize={0.1} color="white">
        {fault.name}
      </Text>

      <Text position={[0, 0.1, 0.01]} fontSize={0.07} color="orange">
        {fault.severity}
      </Text>

      {/* Severity Badge */}
      <Text
        position={[0, 0.38, 0.01]}
        fontSize={0.09}
        color={fault.severity === "High" ? "#fb923c" : "#f87171"}
        anchorX="center"
        anchorY="middle"
      >
        {fault.severity.toUpperCase()} ALERT
      </Text>

      {/* Fault Image (if available) */}
      {fault.img && (
        <mesh position={[0, -0.1, 0.02]}>
          <planeGeometry args={[0.6, 0.3]} />
          <meshBasicMaterial>
            <canvasTexture
              attach="map"
              image={(function () {
                const img = new Image();
                img.src = fault.img;
                return img;
              })()}
            />
          </meshBasicMaterial>
        </mesh>
      )}

      {/* Key Info Grid */}
      <Text
        position={[-0.7, -0.35, 0.01]}
        fontSize={0.06}
        color="#9ca3af"
        anchorX="left"
      >
        Distance from Start:
      </Text>
      <Text
        position={[0.2, -0.35, 0.01]}
        fontSize={0.06}
        color="white"
        anchorX="right"
      >
        {fault.distensToStartPoint} m
      </Text>

      <Text
        position={[-0.7, -0.45, 0.01]}
        fontSize={0.06}
        color="#9ca3af"
        anchorX="left"
      >
        Detected at:
      </Text>
      <Text
        position={[0.3, -0.45, 0.01]}
        fontSize={0.06}
        color="white"
        anchorX="right"
      >
        {fault.timeStamp}
      </Text>

      <Text
        position={[-0.7, -0.55, 0.01]}
        fontSize={0.06}
        color="#9ca3af"
        anchorX="left"
      >
        Marker Size:
      </Text>
      <Text
        position={[0.2, -0.55, 0.01]}
        fontSize={0.06}
        color="#facc15"
        anchorX="right"
      >
        {fault.size}
      </Text>
      <Text
        position={[0.7, 0.45, 0.01]}
        fontSize={0.08}
        color="red"
        onClick={onClose}
        scale={6}
      >
        ×
      </Text>
    </group>
  );
}
