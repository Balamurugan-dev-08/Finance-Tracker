import React from "react";

const Model = ({show,onClose,children}) => {
  return (
    
      <div
        style={{
          transform: show ? "translateX(0%)" : "translateX(-200%)",
        }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <div className="container mx-auto h-[90vh] max-w-2xl bg-slate-800 rounded-4xl p-5 transition-all duration-500">
          <button
            className="w-10 h-10 mb-4 rounded-full bg-slate-600 font-bold"
            onClick={() => onClose(false)}
          >
            X
          </button>
          {children}
          
        </div>
      </div>

  );
};

export default Model;
