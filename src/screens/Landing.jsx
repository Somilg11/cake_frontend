import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import { CakeSlice, X, Code, Users, Shield, Github, Settings, ChevronRight, HelpCircle } from 'lucide-react';

const Landing = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(true);

  const handleButtonClick = () => {
    navigate(user ? '/dashboard' : '/login');
  };

  useEffect(() => {
    if (!showNotification) {
      document.getElementById('navbar').style.top = '0';
    }
  }, [showNotification]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      {/* Notification Bar */}
      {showNotification && (
        <div className="flex items-center justify-between p-3 bg-blue-600 text-white text-sm text-center fixed top-0 w-full z-20">
          <p>🚀 Hosted on Render! May take time to repond, sorry for inconvinience :) Check out our <span className="font-bold cursor-pointer underline" onClick={() => navigate('/docs')}>Docs</span>.</p>
          <button onClick={() => setShowNotification(false)} className="p-1 hover:text-gray-200">
            <X size={16} />
          </button>
        </div>
      )}
      
      {/* Navbar */}
      <header id="navbar" className="flex justify-between items-center px-8 py-4 bg-transparent backdrop-blur-md fixed w-full z-10 transition-all top-10">
        <div className="text-2xl font-bold flex items-center gap-2">
          <CakeSlice />CAKE
        </div>
        <nav className="space-x-4 md:space-x-6 flex items-center">
          <button className="text-white hover:text-gray-300 transition cursor-pointer" onClick={() => navigate('/docs')}>Docs</button>
          <button className="bg-black rounded-md text-white border border-zinc-800 transition cursor-pointer" onClick={() => window.open('https://github.com/Somilg11/cake_frontend', '_blank')}>
            <span className='inline-flex items-center gap-2 px-3 md:px-5 p-1 md:p-2'><Github size={16} />Fork</span>
          </button>
          <button onClick={handleButtonClick} className="p-1 md:p-2 px-3 md:px-5 text-sm md:text-base font-semibold bg-blue-500 hover:bg-blue-600 transition rounded-md cursor-pointer">
            {user ? 'Dashboard' : 'Login'}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="min-h-screen flex-grow flex flex-col gap-6 items-center justify-center text-center px-4 pt-40 bg-gradient-to-r from-purple-800 via-black to-blue-800">
        <h1 className="text-6xl font-extrabold leading-tight">Revolutionize Your Coding with <span className="text-blue-500">CAKE</span></h1>
        <p className="text-lg text-gray-300 max-w-2xl">Collaborative AI-Assisted Koding Environment – The future of coding starts here.</p>
        <button onClick={handleButtonClick} className="px-5 py-2 cursor-pointer bg-white text-black text-lg font-bold rounded-lg shadow-lg transition">
          <span className='inline-flex items-center'>✨Get Started<ChevronRight/></span>
        </button>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-gray-950 text-center">
  <h2 className="text-4xl font-bold mb-8">Why Choose CAKE?</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-900">
      <Code size={40} className="mx-auto mb-4 text-blue-400" />
      <h3 className="text-xl font-semibold">AI-Powered Coding</h3>
      <p className="text-gray-400 mt-2">Leverage AI to enhance your coding efficiency.</p>
    </div>
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-green-900">
      <Users size={40} className="mx-auto mb-4 text-green-400" />
      <h3 className="text-xl font-semibold">Collaborative Workspace</h3>
      <p className="text-gray-400 mt-2">Work together in real-time with seamless integration.</p>
    </div>
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-red-900">
      <Shield size={40} className="mx-auto mb-4 text-red-400" />
      <h3 className="text-xl font-semibold">Secure & Reliable</h3>
      <p className="text-gray-400 mt-2">Your data is encrypted and protected.</p>
    </div>
  </div>
</section>


      {/* FAQ Section */}
      <div className='max-w-5xl mx-auto px-4 mb-10'>
      <section className="mt-8">
          <h2 className="text-3xl font-bold flex items-center gap-2"><HelpCircle /> FAQs</h2>
          <ul className="mt-3 space-y-2 text-gray-300 list-disc list-inside">
            <li><strong>How do I invite collaborators?</strong> Click the 'Add Collaborator' button and enter their email.</li>
            <li><strong>How does AI-assisted coding work?</strong> Start your prompt with <code>@ai</code>, and AI will generate code suggestions.</li>
            <li><strong>Can I run my code inside the browser?</strong> Yes! We use WebContainers to execute and preview your code in real-time.</li>
            <li><strong>What technologies are used?</strong> CAKE is built with MongoDB, Express.js, React, Node.js, Redis, and WebSockets.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold flex items-center gap-2"><Users /> Feel Free to Contribute</h2>
          <p className="mt-3 text-gray-300">We welcome contributions! Fork the repo, make improvements, and submit a pull request.</p>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-6 px-6 mt-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-5xl font-semibold">CAKE</h3>
            <p className="mt-2">An AI-powered, collaborative coding platform with real-time chat and WebContainer execution.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Resources</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="hover:text-white">GitHub Repository</a></li>
              <li><a href="#" className="hover:text-white">API Documentation</a></li>
              <li><a href="#" className="hover:text-white">Contributing Guide</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Connect</h3>
            <ul className="mt-2 space-y-2">
              <li>Email: support@cake.dev</li>
              <li>Twitter: @cake_collab</li>
              <li>Discord: Join our community</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;