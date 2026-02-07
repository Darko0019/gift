import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group } from "three";

export default function Fireball() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("@/assets/models/fireball.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach(action => {
        if (action) {
          action.reset().play();
        }
      });
    }
  }, [actions]);

  return <primitive ref={group} object={scene} />;
}

useGLTF.preload("/src/assets/models/fireball.glb");
