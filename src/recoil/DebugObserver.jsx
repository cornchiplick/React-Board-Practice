import { useEffect } from "react";
import { useRecoilSnapshot } from "recoil";

export default function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
      console.debug(node);
      console.debug(`atom changed: ${node.key}`, snapshot.getLoadable(node));
    }
  }, [snapshot]);
  return null;
}