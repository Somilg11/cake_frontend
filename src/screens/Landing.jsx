/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { CakeSlice, X, Code, Users, Shield, Github, Settings, ChevronRight, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';

const Landing = () => {
  const [showNotification, setShowNotification] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(user ? '/dashboard' : '/login');
  };

  useEffect(() => {
    if (!showNotification) {
      document.getElementById('navbar').style.top = '0';
    }
  }, [showNotification]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Notification Bar */}
      {showNotification && (
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm fixed top-0 w-full z-30 backdrop-blur-md">
          <p className="flex-1 text-center px-4">🚀 Hosted on Render! May take time to respond, sorry for inconvenience :) Check out our <span className="font-bold cursor-pointer underline" onClick={() => navigate('/docs')}>Docs</span>.</p>
          <button onClick={() => setShowNotification(false)} className="p-1 hover:text-gray-200 flex-shrink-0">
            <X size={16} />
          </button>
        </div>
      )}
      
      {/* Navbar */}
      <header id="navbar" className={`flex justify-between items-center px-4 md:px-8 py-4 bg-black/50 backdrop-blur-xl fixed w-full z-20 transition-all ${showNotification ? 'top-10' : 'top-0'} border-b border-white/10`}>
        <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <CakeSlice className="text-purple-400" />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">CAKE</span>
        </div>
        <nav className="space-x-4 md:space-x-6 flex items-center">
          <button className="text-white/80 hover:text-white transition cursor-pointer hidden sm:block" onClick={() => navigate('/docs')}>Docs</button>
          <button className="bg-white/10 backdrop-blur-md rounded-lg text-white border border-white/20 hover:bg-white/20 transition cursor-pointer" onClick={() => window.open('https://github.com/Somilg11/cake_frontend', '_blank')}>
            <span className='inline-flex items-center gap-2 px-3 md:px-4 py-2'><Github size={16} />Fork</span>
          </button>
          <button onClick={handleButtonClick} className="px-4 md:px-6 py-2 text-sm md:text-base font-semibold bg-gradient-to-r from-purple-600 to-purple-800 transition rounded-lg cursor-pointer shadow-lg">
            {user ? 'Dashboard' : 'Login'}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="min-h-screen flex-grow flex flex-col items-center justify-center text-center px-4 pt-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-8 backdrop-blur-md">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            AI-POWERED v2.0
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 tracking-tight">
            <div className="mb-0 md:-mb-8">A Foundation</div>
            <div className="mb-0 md:-mb-8">for <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Code</span> in</div>
            <div className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AI-Era</div>
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            CAKE creates a standard for collaborative coding enabling the future of AI-assisted development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button onClick={handleButtonClick} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-black hover:from-purple-900 hover:to-black text-white font-semibold rounded-lg transition shadow-lg backdrop-blur-md">
              <span className='inline-flex items-center gap-2 text-sm md:text-base'>✨GET STARTED <ChevronRight size={18}/></span>
            </button>
            <button onClick={() => navigate('/docs')} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition backdrop-blur-md border border-white/20">
              DOCS →
            </button>
          </div>

          {/* Backed By */}
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm mb-4 uppercase tracking-wider">BACKED BY</p>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
              <span className="text-gray-300 font-medium">Node</span>
              <span className="text-gray-300 font-medium">Redis</span>
              <span className="text-gray-300 font-medium">Webcontainers</span>
              <span className="text-gray-300 font-medium">Websockets</span>
            </div>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section className="py-16 relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">+150K</div>
              <div className="text-gray-400 text-sm">Lines of code written</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">+12K</div>
              <div className="text-gray-400 text-sm">Active developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">+500</div>
              <div className="text-gray-400 text-sm">Projects created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">+2M</div>
              <div className="text-gray-400 text-sm">API calls</div>
            </div>
          </div>
        </div>
      </section>

      {/* Code reviewer */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Check Out Our New AI Code Reviewer</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Code Snippet Preview */}
            <div className="bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
              <pre className="text-left text-sm text-green-400 overflow-x-auto">
                <code>
{`function optimizeCode(input) {
  return AI.suggest(input);
}`}
                </code>
              </pre>
              <p className="text-gray-400 text-sm mt-4">AI-generated insights to improve your code instantly.</p>
            </div>
            
            {/* Description + Button */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Smart Code Review, DEBUG</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Get AI-powered suggestions, best practices, and performance improvements for your code in real-time.
              </p>
              
              <a href="https://debug-frontend-zeta.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition shadow-lg">
                🐞 Check Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose CAKE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-900/30 backdrop-blur-md rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 group hover:bg-blue-900/20">
              <Code size={48} className="mb-6 text-blue-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">AI-Powered Coding</h3>
              <p className="text-gray-400">Leverage AI to enhance your coding efficiency and productivity.</p>
            </div>
            <div className="p-8 bg-gray-900/30 backdrop-blur-md rounded-2xl border border-white/10 hover:border-green-500/50 transition-all duration-300 group hover:bg-green-900/20">
              <Users size={48} className="mb-6 text-green-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Collaborative Workspace</h3>
              <p className="text-gray-400">Work together in real-time with seamless integration.</p>
            </div>
            <div className="p-8 bg-gray-900/30 backdrop-blur-md rounded-2xl border border-white/10 hover:border-red-500/50 transition-all duration-300 group hover:bg-red-900/20">
              <Shield size={48} className="mb-6 text-red-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Secure & Reliable</h3>
              <p className="text-gray-400">Your data is encrypted and protected with enterprise-grade security.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ and Contribute Section */}
      <div className='max-w-6xl mx-auto px-4 py-16 relative z-10'>
        <div className="grid md:grid-cols-2 gap-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-2"><HelpCircle className="text-purple-400" /> FAQs</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-900/30 backdrop-blur-md rounded-lg border border-white/10">
                <h4 className="font-semibold text-white mb-2">How do I invite collaborators?</h4>
                <p className="text-gray-400">Click the 'Add Collaborator' button and enter their email.</p>
              </div>
              <div className="p-4 bg-gray-900/30 backdrop-blur-md rounded-lg border border-white/10">
                <h4 className="font-semibold text-white mb-2">How does AI-assisted coding work?</h4>
                <p className="text-gray-400">Start your prompt with <code className="bg-purple-600/20 px-2 py-1 rounded text-purple-300">@ai</code>, and AI will generate code suggestions.</p>
              </div>
              <div className="p-4 bg-gray-900/30 backdrop-blur-md rounded-lg border border-white/10">
                <h4 className="font-semibold text-white mb-2">Can I run my code inside the browser?</h4>
                <p className="text-gray-400">Yes! We use WebContainers to execute and preview your code in real-time.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-2"><Users className="text-green-400" /> Feel Free to Contribute</h2>
            <p className="text-gray-300 leading-relaxed">We welcome contributions! Fork the repo, make improvements, and submit a pull request to help shape the future of collaborative coding.</p>
            <button onClick={() => window.open('https://github.com/Somilg11/cake_frontend', '_blank')} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition shadow-lg">
              ✨Star Repo Now! <ChevronRight/>
            </button>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-md border-t border-white/10 text-gray-300 py-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">CAKE</h3>
            <p className="text-gray-400 leading-relaxed">An AI-powered, collaborative coding platform with real-time chat and WebContainer execution.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/Somilg11/cake_frontend" className="text-gray-400 hover:text-white transition">GitHub Repository</a></li>
              <li><a href="/docs" className="text-gray-400 hover:text-white transition">API Documentation</a></li>
              <li><a href="/docs" className="text-gray-400 hover:text-white transition">Contributing Guide</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:gsomil93@gmail.com" className="text-gray-400 hover:text-white transition">
                  Email: gsomil93@gmail.com
                </a>
              </li>
              <li>
                <a href="https://twitter.com/somil_1101" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  Twitter: @somil_1101
                </a>
              </li>
              <li className="text-gray-400">Discord: Join our community</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;