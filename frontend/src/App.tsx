import { Button } from "@/components/ui/button"
import { SignInButton,UserButton } from "@clerk/clerk-react"
import { SignedIn,SignedOut } from "@clerk/clerk-react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage"
import HomePage from "./pages/home/HomePage"

function App() {
  return (
    <>
     <header>
        <SignedOut>
          <SignInButton >
            <Button variant={"destructive"}>Sign in</Button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
    </header>
     <h1 style={{ color: "red" }}>Music App</h1>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage />} />
      
    <Route path="/auth-callback" element={<AuthCallbackPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
