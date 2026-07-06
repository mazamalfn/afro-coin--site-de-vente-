import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Accueil from './accueil-catalogue'
import Catalogue from './catalogue-produits'
import Login from './Login'
import Admin from './Admin'
import ProtectedRoute from './ProtectedRoute'

function AccueilWrapper() {
  const navigate = useNavigate()
  const handleNavigate = (targetPage, options = {}) => {
    if (targetPage === 'catalogue') {
      const params = new URLSearchParams()
      if (options.category) params.set('categorie', options.category)
      if (options.tri) params.set('tri', options.tri)
      navigate(`/catalogue?${params.toString()}`)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return <Accueil onNavigate={handleNavigate} />
}

function CatalogueWrapper() {
  const navigate = useNavigate()
  const handleNavigate = (targetPage) => {
    if (targetPage === 'accueil') {
      navigate('/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return <Catalogue onNavigate={handleNavigate} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccueilWrapper />} />
        <Route path="/catalogue" element={<CatalogueWrapper />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App