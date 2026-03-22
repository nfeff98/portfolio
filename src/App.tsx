import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Background from '@/canvas/Background'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import Contact from '@/pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Background />
      <Nav />
      <Routes>
        <Route path="/"                   element={<Home />} />
        <Route path="/projects"           element={<Projects />} />
        <Route path="/projects/:slug"     element={<ProjectDetail />} />
        <Route path="/contact"            element={<Contact />} />
        {/* Catch-all — redirect unknown paths to home */}
        <Route path="*"                   element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
