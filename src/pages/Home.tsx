import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Youtube, Brain, Sparkles, BookOpen } from 'lucide-react';

const QuickTubeLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-8 w-8">
    <defs>
      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#6366F1"}}/>
        <stop offset="100%" style={{stopColor:"#8B5CF6"}}/>
      </linearGradient>
    </defs>
    
    <circle cx="16" cy="16" r="14" fill="url(#brainGradient)"/>
    
    <path d="M16,10 
             C19,10 21,11 21,13
             C21,14.5 19,15 19,16.5
             C19,18 21,18.5 21,20
             C21,22 19,23 16,23
             C13,23 11,22 11,20
             C11,18.5 13,18 13,16.5
             C13,15 11,14.5 11,13
             C11,11 13,10 16,10Z" 
          stroke="white" 
          fill="none"
          strokeWidth="1.5"
          strokeLinejoin="round"/>
  </svg>
);


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Understand YouTube Videos Better
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Get AI-powered explanations for any YouTube video in simple, easy-to-understand language
        </p>
        <button
          onClick={() => navigate('/explain')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center space-x-2 mx-auto"
        >
          <Brain className="h-8 w-8  text-white-400" />
          <span>Start Explaining Videos</span>
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard class="bg-gray-900"
          icon={<Youtube className="h-8 w-8 text-red-500" />}
          title="Any YouTube Video"
          description="Simply paste the URL of any YouTube video you want to understand better"
        />
        <FeatureCard
          icon={<Brain className="h-8 w-8 text-purple-500" />}
          title="AI-Powered Analysis"
          description="Advanced AI breaks down complex topics into simple explanations"
        />
        <FeatureCard
          icon={<BookOpen className="h-8 w-8 text-green-500" />}
          title="Easy Learning"
          description="Get clear, concise explanations that make learning effortless"
        />
      </div>

      <div className="text-center bg-gray-800 rounded-xl p-8 border border-gray-700">
        <Sparkles className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <Step number={1} text="Paste any YouTube video URL" />
          <Step number={2} text="Our AI analyzes the video content" />
          <Step number={3} text="Get a clear, simple explanation" />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Step = ({ number, text }: { number: number; text: string }) => (
  <div className="flex items-start space-x-3">
    <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
      {number}
    </div>
    <p className="text-gray-300">{text}</p>
  </div>
);

export default Home;