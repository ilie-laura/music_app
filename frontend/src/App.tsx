import { Button } from "@/components/ui/button"
function App() {
  return (
    <>
      <h1 className="text-red-500 font-bold text-center">Hello world!</h1>
      <p className="text-gray-700 text-center">Welcome to my Tailwind CSS app!</p>
       <div className="flex min-h-svh flex-col items-center justify-center">
      <Button variant={"default"}>Click me</Button>
    </div>
    </>
  )
}

export default App
