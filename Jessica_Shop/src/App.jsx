import { useState } from 'react'
import Accueil from './accueil-catalogue'
import Catalogue from './catalogue-produits'

function App() {
  const [page, setPage] = useState('accueil') // 'accueil' | 'catalogue'
  const [initialCategory, setInitialCategory] = useState('Tous')
  const [initialTri, setInitialTri] = useState('populaire')

  const handleNavigate = (targetPage, options = {}) => {
    if (options.category !== undefined) {
      setInitialCategory(options.category)
    } else if (targetPage === 'accueil') {
      setInitialCategory('Tous')
    }

    if (options.tri !== undefined) {
      setInitialTri(options.tri)
    } else if (targetPage === 'accueil') {
      setInitialTri('populaire')
    }

    setPage(targetPage)
    // Smooth scroll to top of the page on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {page === 'accueil' ? (
        <Accueil onNavigate={handleNavigate} />
      ) : (
        <Catalogue
          onNavigate={handleNavigate}
          initialCategory={initialCategory}
          initialTri={initialTri}
        />
      )}
    </>
  )
}

export default App
