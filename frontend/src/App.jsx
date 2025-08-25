import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [urls, setUrls] = useState([])
  const [showAdmin, setShowAdmin] = useState(false)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await axios.post(`${API_BASE_URL}/shorten`, {
        originalUrl
      })
      
      setShortUrl(response.data.shortUrl)
      setSuccess('URL shortened successfully! Click the short URL to test it.')
      setOriginalUrl('')
      fetchUrls()
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin`)
      setUrls(response.data)
    } catch (err) {
      console.error('Error fetching URLs:', err)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setSuccess('URL copied to clipboard!')
    } catch (err) {
      setError('Failed to copy URL')
    }
  }

  const testShortUrl = () => {
    if (shortUrl) {
      window.open(shortUrl, '_blank')
    }
  }

  const handleShortUrlClick = (shortCode) => {
    const shortUrl = `${(import.meta.env.VITE_PUBLIC_BASE_URL || window.location.origin).replace(/\/$/, '')}/${shortCode}`
    window.open(shortUrl, '_blank')
    setTimeout(() => {
      fetchUrls()
    }, 1000)
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  return (
    <div className="container">
      <h1 className="title">URL Shortener</h1>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="url"
              className="form-input"
              placeholder="Enter your long URL here..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {shortUrl && (
          <div className="result">
            <div className="result-title">Your Shortened URL:</div>
            <div className="result-url">{shortUrl}</div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={copyToClipboard} className="copy-btn">
                Copy URL
              </button>
              <button onClick={testShortUrl} className="copy-btn" style={{ background: '#007bff' }}>
                Test URL
              </button>
            </div>
          </div>
        )}

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>

      <div className="admin-section">
        <h2 className="admin-title">Admin Panel</h2>
        <div className="card">
          <button 
            className="btn" 
            onClick={() => setShowAdmin(!showAdmin)}
            style={{ marginBottom: '20px' }}
          >
            {showAdmin ? 'Hide URLs' : 'Show All URLs'}
          </button>
          
          {showAdmin && (
            <div>
              <h3 style={{ marginBottom: '15px', color: '#333' }}>
                Total URLs: {urls.length}
              </h3>
              <ul className="url-list">
                {urls.map((url) => (
                  <li key={url._id} className="url-item">
                    <div className="url-original">
                      <strong>Original:</strong> {url.originalUrl}
                    </div>
                    <div className="url-short">
                      <strong>Short:</strong> 
                      <a 
                        href={`${(import.meta.env.VITE_PUBLIC_BASE_URL || window.location.origin).replace(/\/$/, '')}/${url.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleShortUrlClick(url.shortCode)}
                        style={{ 
                          color: '#667eea', 
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          marginLeft: '5px'
                        }}
                      >
                        {(import.meta.env.VITE_PUBLIC_BASE_URL || window.location.origin).replace(/\/$/, '')}/{url.shortCode}
                      </a>
                    </div>
                    <div className="url-stats">
                      <strong>Clicks:</strong> {url.clicks} | 
                      <strong>Created:</strong> {new Date(url.createdAt).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
