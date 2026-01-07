"use client";

import { useEffect, useState } from "react";
import { Color } from "three";
import { useThree } from "@react-three/fiber";
import { XROrigin ,XRControllerModel} from "@react-three/xr";

import { ConveyorBelt } from "./ConveyorBelt/ConveyorBelt";
import { ConveyorTape } from "./ConveyorBelt/CoveyorTape";
import { ConveyorControls3D } from "./ConveyorControls3D";
import { FaultModal3D } from "./FaultModal3D"; // ✅ import the modal

 const VR_FAULTS= [
    {
      id: "1",
      name: "Danger Zone 1",
      distensToStartPoint: 300,
      timeStamp: "2025-12-28 14:30:00",
      size: 20,
      img: "/images/danger1.jpg",
      description: "Fault Detected! 🚨",
      severity: "High",
      link: "conveyor-view-details",
    },
    {
      id: "2",
      name: "Misalignment Alert",
      distensToStartPoint: 60,
      timeStamp: "2025-12-28 15:10:22",
      size: 100,
      img: "/images/danger2.jpg",
      description: "Fault Detected! 🚨",
      severity: "Medium",
      link: "conveyor-view-details",
    },
    {
      id: "3",
      name: "Vibration Anomaly",
      distensToStartPoint: 350,
      timeStamp: "2025-12-28 13:45:10",
      size: 30,
      img: "/images/danger3.jpg",
      description: "Fault Detected! 🚨",
      severity: "Critical",
      link: "conveyor-view-details",
    },
    // ... keep all your other initial faults here (even if >250m)
  ];

export default function ConveyorBeltSceneVR() {
  const { scene } = useThree();
  const [speed, setSpeed] = useState(1);

  // ✅ For fault modal
  const [selectedFault, setSelectedFault] = useState(null);

  useEffect(() => {
    scene.background = new Color("#ffffff");
  }, [scene]);

  // Click handler for faults
  const handleFaultClick = (fault) => setSelectedFault(fault);
  const closeModal = () => setSelectedFault(null);

  return (
    <XROrigin position={[20, -40, 50]}  >


      {/* LIGHTS */}
      <ambientLight intensity={2.2} />
      <directionalLight position={[8, 30, 8]} intensity={2} />

      {/* FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1500, 1500]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* CONVEYOR */}
      <ConveyorBelt scale={14} />

      {/* TAPE + Faults */}
      <ConveyorTape
        position={[19, 15, 0]}
        length={245}
        width={12}
        speed={speed}
        faults={VR_FAULTS}
        onFaultClick={handleFaultClick} // ✅ pass click handler
      />

      {/* 3D Controls */}
      <ConveyorControls3D
        onStart={() => setSpeed(1)}
        onStop={() => setSpeed(0)}
        onForward={() => setSpeed(2)}
        onBackward={() => setSpeed(-1)}
      />

      {/* ⚠️ 3D Modal for selected fault */}
      {selectedFault && <FaultModal3D fault={selectedFault} onClose={closeModal} />}
    </XROrigin>
  );
}

