import { useState, useEffect, useCallback } from 'react'
import SearchBar from './components/SearchBar'
import MedicineCard from './components/MedicineCard'
import MedicineDetail from './components/MedicineDetail'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  const [activeMedicineId, setActiveMedicineId] = useState(null)
  const [selectedMedicine, setSelectedMedicine] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState(null)

  useEffect(() => {
    function parseHash() {
      const hash = window.location.hash
      if (hash.startsWith('#/medicine/')) {
        const id = hash.replace('#/medicine/', '').trim()
        setActiveMedicineId(id)
      } else {
        setActiveMedicineId(null)
      }
    }

    parseHash()
    window.addEventListener('hashchange', parseHash)
    return () => {
      window.removeEventListener('hashchange', parseHash)
    }
  }, [])

  useEffect(() => {
    if (!activeMedicineId) {
      return
    }

    if (selectedMedicine && selectedMedicine.id === activeMedicineId) {
      return
    }

    async function fetchMedicineDetails() {
      setDetailLoading(true)
      setDetailError(null)

      try {
        const response = await fetch(
          `https://api.fda.gov/drug/label.json?search=id:"${encodeURIComponent(activeMedicineId)}"&limit=1`
        )

        if (response.status === 404) {
          setDetailError('Medicine not found. Please go back and try another search.')
          setSelectedMedicine(null)
          setDetailLoading(false)
          return
        }

        if (!response.ok) {
          setDetailError('Failed to load medicine details from the FDA database.')
          setSelectedMedicine(null)
          setDetailLoading(false)
          return
        }

        const data = await response.json()
        if (data.results && data.results.length > 0) {
          setSelectedMedicine(data.results[0])
        } else {
          setDetailError('No details found for this medicine.')
          setSelectedMedicine(null)
        }
      } catch {
        setDetailError('Network error while fetching medicine details. Please try again.')
        setSelectedMedicine(null)
      } finally {
        setDetailLoading(false)
      }
    }

    fetchMedicineDetails()
  }, [activeMedicineId, selectedMedicine])

  const searchMedicines = useCallback(async (searchTerm) => {
    const term = searchTerm.trim()
    if (!term) {
      return
    }

    setLoading(true)
    setError(null)
    setSearched(true)
    setActiveQuery(term)

    try {
      const response = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(term)}"&limit=20`
      )

      if (response.status === 404) {
        setResults([])
        setLoading(false)
        return
      }

      if (!response.ok) {
        setError('Error fetching data from the FDA server. Status: ' + response.status)
        setResults([])
        setLoading(false)
        return
      }

      const data = await response.json()
      setResults(data.results || [])
    } catch {
      setError('Could not connect to the FDA API. Please check your network connection.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const term = query.trim()
    if (!term) {
      return
    }

    const timer = setTimeout(() => {
      searchMedicines(term)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [query, searchMedicines])

  function handleInputChange(e) {
    const val = e.target.value
    setQuery(val)
    if (!val.trim()) {
      setResults([])
      setSearched(false)
      setError(null)
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    searchMedicines(query)
  }

  function handleSampleClick(sampleName) {
    setQuery(sampleName)
    searchMedicines(sampleName)
  }

  function handleBackToSearch() {
    window.location.hash = ''
  }

  if (activeMedicineId) {
    return (
      <div className="app-container">
        <MedicineDetail
          medicine={selectedMedicine}
          loading={detailLoading}
          error={detailError}
          onBack={handleBackToSearch}
        />
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="header-section">
        <h1>Medicine Search</h1>
        <p>Search FDA approved medicines by brand name</p>
      </div>

      <SearchBar
        query={query}
        onChange={handleInputChange}
        onSubmit={handleFormSubmit}
        onSampleClick={handleSampleClick}
        loading={loading}
      />

      {loading && (
        <div className="status-message loading-box">
          Searching for medicines, please wait...
        </div>
      )}

      {error && <div className="status-message error-box">{error}</div>}

      {!loading && !error && searched && results.length === 0 && (
        <div className="status-message not-found-box">
          No results found for &quot;{activeQuery}&quot;. Please check the spelling or try another brand name.
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <div className="results-header">
            Found {results.length} result{results.length > 1 ? 's' : ''} for &quot;{activeQuery}&quot;
          </div>

          <div className="cards-container">
            {results.map((item, index) => (
              <MedicineCard
                key={item.id || index}
                item={item}
                onSelect={setSelectedMedicine}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
