import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "@/pages/Home"
import { Toaster } from "@/components/ui/ToasterComponent"

function App() {

  return (
    <>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
