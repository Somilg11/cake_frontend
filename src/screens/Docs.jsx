import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Code, Terminal, Users, Shield, Database, MessageCircle, Zap, Server, Settings, Layers } from 'lucide-react';

const Docs = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200">
            {/* Navbar */}
            <header className="bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center gap-2"><Book /> CAKE Documentation</h1>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-md font-semibold hover:bg-blue-700 transition"
                >
                    Home
                </button>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto py-10 px-6">
                <section>
                    <h2 className="text-3xl font-bold flex items-center gap-2"><Code /> Overview</h2>
                    <p className="mt-3 text-gray-300">
                        The <strong>Collaborative AI-Assisted Koding Environment (CAKE)</strong> is a real-time coding collaboration platform with AI assistance. Users can work together, chat, and execute code in the browser using WebContainers.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold flex items-center gap-2"><Zap /> Features</h2>
                    <ul className="mt-3 space-y-2 list-disc list-inside text-gray-300">
                        <li><strong>Real-Time Collaboration:</strong> Work with multiple developers on the same project.</li>
                        <li><strong>AI-Assisted Coding:</strong> Ask AI for code suggestions using <code>@ai</code> before the prompt.</li>
                        <li><strong>Live Chat:</strong> Instantly communicate with team members.</li>
                        <li><strong>File Creation:</strong> AI can generate and create new files.</li>
                        <li><strong>Code Execution:</strong> Run and preview files inside the browser using WebContainers.</li>
                        <li><strong>Authentication & Security:</strong> Secure login with JWT and bcrypt.</li>
                    </ul>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold flex items-center gap-2"><MessageCircle /> How to Use</h2>
                    <p className="mt-3 text-gray-300">Here&apos;s how you can utilize CAKE for seamless collaboration:</p>
                    <ul className="mt-2 space-y-2 text-gray-300 list-disc list-inside">
                        <li><strong>Adding Collaborators:</strong> Invite others to join your project in real time.</li>
                        <li><strong>Chatting in Real Time:</strong> Use the integrated chat feature to communicate.</li>
                        <li><strong>AI Code Assistance:</strong> Type <code>@ai</code> followed by a prompt to generate code.</li>
                        <li><strong>File Management:</strong> AI can create and modify project files for you.</li>
                        <li><strong>Running Code:</strong> Execute scripts directly inside the browser using WebContainers.</li>
                    </ul>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold flex items-center gap-2"><Server /> Deployment</h2>
                    <p className="mt-3 text-gray-300">
                        The application is deployed as follows:
                    </p>
                    <ul className="mt-2 space-y-2 text-gray-300">
                        <li><strong>Frontend:</strong> Hosted on Vercel.</li>
                        <li><strong>Backend:</strong> Hosted on Render (may take time to respond).</li>
                    </ul>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold flex items-center gap-2"><Database /> Tech Stack</h2>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-4">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-md">MongoDB</span>
                        <span className="bg-black text-white px-3 py-1 rounded-md">Express.js</span>
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-md">React</span>
                        <span className="bg-green-700 text-white px-3 py-1 rounded-md">Node.js</span>
                        <span className="bg-red-600 text-white px-3 py-1 rounded-md">Redis</span>
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-md">Socket.io</span>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold flex items-center gap-2"><Terminal /> Installation & Setup</h2>
                    <p className="mt-3 text-gray-300">Follow these steps to set up the application locally:</p>

                    <h3 className="text-xl font-semibold mt-4 flex items-center gap-2"><Settings /> Backend Setup</h3>
                    <pre className="bg-gray-800 text-white p-3 rounded-md mt-2 overflow-x-auto">
                        {`git clone https://github.com/your-repo/collaborative-coding.git
cd collaborative-coding/backend
npm install
npm start`}
                    </pre>

                    <h3 className="text-xl font-semibold mt-4 flex items-center gap-2"><Layers /> Frontend Setup</h3>
                    <pre className="bg-gray-800 text-white p-3 rounded-md mt-2 overflow-x-auto">
                        {`cd ../frontend
npm install
npm run dev`}
                    </pre>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold flex items-center gap-2"><Users /> Contributing</h2>
                    <p className="mt-3 text-gray-300">We welcome contributions! Follow these steps:</p>
                    <pre className="bg-gray-800 text-white p-3 rounded-md mt-2 overflow-x-auto">
                        {`git checkout -b feature-name
git commit -m "Added a new feature"
git push origin feature-name`}
                    </pre>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold flex items-center gap-2"><Shield /> License</h2>
                    <p className="mt-3 text-gray-300">This project is licensed under the <strong>MIT License</strong>.</p>
                </section>
            </main>
        </div>
    );
};

export default Docs;