
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Power } from "lucide-react";

const WelcomeScreen: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate("/posts");
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#1C1D2A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMWMxZDJhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyNDI3MzkiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      
      <div className={`relative transition-all duration-700 ease-in-out transform ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[150px] w-[3px] h-[150px] bg-gradient-to-b from-transparent via-post-blue to-post-blue">
          <div className="absolute w-3 h-3 rounded-full bg-[#FFB921] bottom-0 left-1/2 transform -translate-x-1/2"></div>
        </div>
        
        <div className="w-[320px] h-[380px] rounded-3xl overflow-hidden bg-post-blue shadow-2xl relative">
          <div className="absolute top-0 left-0 right-0 h-12 bg-[#324da0] flex items-center justify-between px-6">
            <div className="w-4 h-4 rounded-full bg-[#212947] opacity-60"></div>
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
            </div>
            <div className="w-4 h-4 rounded-full bg-[#212947] opacity-60"></div>
          </div>
          
          <div className="bg-[#212947] m-3 mt-16 rounded-xl p-6 h-[180px] flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-white mb-3">Post Gallery</h1>
            <p className="text-gray-400 text-sm">
              A beautiful collection of posts designed with modern animations and UI. 
              Click the button below to enter the gallery.
            </p>
          </div>
          
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <button 
              onClick={handleClick}
              className="power-button w-16 h-16 rounded-full bg-[#FFB921] flex items-center justify-center hover:brightness-110 transition-all duration-300 cursor-pointer relative group"
            >
              <Power className="w-8 h-8 text-[#212947]" />
              <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="relative bg-white rounded-full px-4 py-1 font-bold text-black text-sm">
                  CLICK
                  <div className="absolute h-3 w-3 bg-white rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>
            </button>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#324da0] flex items-center justify-between px-6">
            <div className="w-4 h-4 rounded-full bg-[#212947] opacity-60"></div>
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
              <div className="w-1 h-1 rounded-full bg-white opacity-60"></div>
            </div>
            <div className="w-4 h-4 rounded-full bg-[#212947] opacity-60"></div>
          </div>
        </div>
      </div>
      
      <div className="text-gray-500 mt-10 text-sm font-light tracking-wider">
        TURN ON YOUR DEVICE
      </div>
    </div>
  );
};

export default WelcomeScreen;
