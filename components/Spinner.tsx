import React from "react";
import { PropagateLoader } from "react-spinners";

function Spinner({ mess }: { mess: string }) {
  return (
    <div className="w-full h-full flex flex-col py-5 items-center justify-center gap-5">
      <PropagateLoader color="#fe2c55" />
      {mess && (
        <span className="text-base font-medium text-gray-500">{mess}</span>
      )}
    </div>
  );
}

export default Spinner;
