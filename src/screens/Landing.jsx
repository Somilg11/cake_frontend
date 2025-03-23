import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user.context'
import { CakeSlice } from 'lucide-react'

const Landing = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const handleButtonClick = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 bg-zinc-900 text-white">
        <div className="text-xl font-bold"><span className='flex items-center gap-2'><CakeSlice />CAKE</span></div>
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 bg-white text-black rounded-md cursor-pointer font-semibold tracking-tighter"
        >
          {user ? 'Dashboard' : 'Login'}
        </button>
      </header>


      <main className="flex-grow flex flex-col gap-5 items-center justify-center bg-black text-white">
        <h1 className="text-5xl font-bold">Welcome to CAKE</h1>
        <p>CAKE: Collaborative AI-Assisted Koding Environment 🍰</p>
      </main>

        <footer className="p-1 bg-zinc-900 text-zinc-500 text-center">
            <p>© 2025 CAKE. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default Landing