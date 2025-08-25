import { Button } from "@/components/ui/button"
import { SignInButton,UserButton } from "@clerk/clerk-react"
import { SignedIn,SignedOut } from "@clerk/clerk-react"
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
    </>
  )
}

export default App
