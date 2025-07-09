import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const handleNavigate = useNavigate();

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl mx-6 mt-6 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-48 h-48 bg-green-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="backdrop-blur-sm bg-white/5 p-12 rounded-3xl border border-white/10 max-w-4xl">
            <h1 className="text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-white via-gray-100 to-green-400 bg-clip-text text-transparent leading-tight">
              Powering Environmental Change
            </h1>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-green-400">
              Decentralized Data
            </h2>
            <p className="text-xl mb-10 max-w-3xl text-gray-300 leading-relaxed">
              EcoChain is a Web3 dApp on the Internet Computer Protocol (ICP) that allows users to contribute and 
              explore environmental data. Join our community to make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => handleNavigate("/submit")} 
                className="group relative bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/25"
              >
                <span className="relative z-10">Contribute Data</span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button 
                onClick={() => handleNavigate("/dao")} 
                className="group relative border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/5"
              >
                <span className="relative z-10">Explore DAO</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 to-green-400/0 group-hover:from-green-600/20 group-hover:to-green-400/20 rounded-2xl transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-gray-900/40 to-black/60 opacity-50"></div>
      </section>



      {/* How It Works */}
      <section className="mx-6 mt-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard 
            step="1"
            title="Contribute Data"
            description="Share your environmental data with our community and help build a comprehensive database."
            icon="🌱"
          />
          <StepCard 
            step="2"
            title="DAO Votes"
            description="Participate in DAO governance by voting on proposals and shaping the future of our platform."
            icon="🗳️"
          />
          <StepCard 
            step="3"
            title="Earn ECO Tokens"
            description="Receive ECO tokens for your contributions, participation, and validated data submissions."
            icon="🪙"
          />
        </div>
      </section>

      {/* Our Mission */}
      <section className="mx-6 mt-24 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full"></div>
        </div>
        <div className="relative bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 p-12 rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-400/5 rounded-full blur-2xl"></div>
          <p className="text-xl leading-relaxed text-gray-300 relative z-10 max-w-4xl">
            At EcoChain, we believe in the power of decentralized data to drive positive environmental change. 
            Our mission is to create a transparent and collaborative platform where individuals can contribute, 
            validate, and explore environmental data, fostering a more sustainable future for all. Together, 
            we're building the infrastructure for a greener tomorrow.
          </p>
        </div>
      </section>
    </div>
  );
}



function StepCard({ step, title, description, icon }) {
  return (
    <div className="group relative bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-400/0 group-hover:from-green-500/5 group-hover:to-green-400/5 transition-all duration-300"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="text-4xl mr-4 transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-black text-lg shadow-lg">
            {step}
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed text-lg">{description}</p>
      </div>
    </div>
  );
}

function FooterLink({ href, text }) {
  return (
    <a href={href} className="text-gray-400 hover:text-green-400 transition-colors duration-300 font-medium">
      {text}
    </a>
  );
}