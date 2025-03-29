import AppRoutes from "./routes/AppRoutes"
import { UserProvider } from "./context/user.context"
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <UserProvider>
        <Toaster/>
        <AppRoutes/>
      </UserProvider>
    </div>
  )
}

export default App
