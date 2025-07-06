import React from 'react';
import { Github } from 'lucide-react';

export const Footer = () =>{
    return (    
        <div>
        {/* Footer */}
      <footer className="bg-[#F9F5EB] py-12 px-6 border-t-4 border-[#2C5F7A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-[#1F2937] text-lg font-semibold">© 2025 The Aevum by NeuroNumb</p>
              <p className="text-[#486069] text-sm">Exploring the timeless questions of tomorrow</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <button
              onClick={() => {
                window.open("https://github.com/MdKaif2782/little-magazine-web", "_blank")
              }}
              className="w-12 h-12 bg-[#2C5F7A] text-white rounded-full hover:bg-[#FBD86D] hover:text-[#1F2937] transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-lg">
                <Github className="w-6 h-6" color="white" />
              </button>
              <button
              onClick={() => {
                window.open("https://github.com/MdKaif2782/little-magazine-latex", "_blank")
              }}
               className="w-12 h-12 bg-[#2C5F7A] text-white rounded-full hover:bg-[#FBD86D] hover:text-[#1F2937] transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-lg">
                <Github className="w-6 h-6" color="white" />
              </button>
            </div>
          </div>
        </div>
      </footer>
      </div>
    )
}