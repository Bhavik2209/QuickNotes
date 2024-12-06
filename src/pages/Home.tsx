import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Youtube, Brain, Sparkles, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();

  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Understand YouTube Videos Better
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Get AI-powered explanations for any YouTube video in simple, easy-to-understand language
        </p>
        {user ? (
          <button
            onClick={() => navigate('/explain')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center space-x-2 mx-auto"
          >
            <Brain className="h-8 w-8 text-white-400" />
            <span>Start Explaining Videos</span>
          </button>
        ) : (
          <div 
            onClick={signInWithGoogle}
            className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
          >
            <p className="text-2xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text animate-pulse">
              Sign in now to start exploring!
            </p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
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