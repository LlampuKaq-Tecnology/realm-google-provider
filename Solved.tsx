import React, { useEffect, useState } from "react";

function Solved({ children }: any) {
  const [window, setWindow] = useState(false);
  useEffect(() => {
    setWindow(true);
  }, []);
  return <>{window && children}</>;
}

export default Solved;
