import { useMemo, useState } from 'react'

const colleges = [
  {
    id: 'mit-wpu',
    name: 'MIT-WPU Pune',
    location: 'Kothrud, Pune',
    activeHubs: 5,
  },
  {
    id: 'coep',
    name: 'COEP Technological Univ.',
    location: 'Shivajinagar, Pune',
    activeHubs: 3,
  },
  {
    id: 'symbiosis',
    name: 'Symbiosis International',
    location: 'Viman Nagar, Pune',
    activeHubs: 4,
  },
]

const properties = [
  {
    id: 'sunrise-pg',
    title: 'Sunrise Premium Student PG',
    type: 'PG',
    rent: 7500,
    deposit: 12000,
    distance: '450m • 6 min walk',
    collegeId: 'mit-wpu',
    roomOptions: ['Single', 'Double', 'Triple'],
    amenities: ['Wi-Fi', 'Food', 'Laundry', 'CCTV'],
    rating: 4.8,
    ownerName: 'Rajesh Patil',
    ownerPhone: '919876543210',
    address: 'Near Gate 2, Paud Road, Kothrud, Pune',
    lat: 18.5074,
    lng: 73.8077,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'greenfield-pg',
    title: 'Greenfield Luxury PG',
    type: 'PG',
    rent: 8900,
    deposit: 15000,
    distance: '700m • 10 min walk',
    collegeId: 'mit-wpu',
    roomOptions: ['Double', 'Triple'],
    amenities: ['Wi-Fi', 'AC', 'Parking'],
    rating: 4.6,
    ownerName: 'Meena Joshi',
    ownerPhone: '919999111222',
    address: 'Rambaug Colony, Kothrud, Pune',
    lat: 18.5058,
    lng: 73.8102,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'ivy-colive',
    title: 'CoLive Ivy Residences',
    type: 'PG',
    rent: 8200,
    deposit: 13000,
    distance: '1.1km • 4 min ride',
    collegeId: 'coep',
    roomOptions: ['Single', 'Double'],
    amenities: ['Wi-Fi', 'Laundry', 'Housekeeping'],
    rating: 4.4,
    ownerName: 'Amit Kulkarni',
    ownerPhone: '918888777666',
    address: 'Shivajinagar Main Road, Pune',
    lat: 18.5306,
    lng: 73.8567,
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'harmony-2bhk',
    title: 'Harmony 2BHK Student Flat',
    type: 'Flat',
    rent: 16500,
    deposit: 30000,
    distance: '900m • 12 min walk',
    collegeId: 'mit-wpu',
    roomOptions: ['2BHK'],
    amenities: ['Semi-furnished', 'Wi-Fi', 'Parking'],
    rating: 4.5,
    ownerName: 'Nikhil Shah',
    ownerPhone: '917777666555',
    address: 'Ideal Colony, Kothrud, Pune',
    lat: 18.5109,
    lng: 73.8142,
    images: [
      'https://images.unsplash.com/photo-1616594039964-3d9d7f6f59fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'studentnest-1bhk',
    title: 'StudentNest 1BHK Flat',
    type: 'Flat',
    rent: 13200,
    deposit: 25000,
    distance: '500m • 8 min walk',
    collegeId: 'symbiosis',
    roomOptions: ['1BHK'],
    amenities: ['Furnished', 'Kitchen', 'Security'],
    rating: 4.3,
    ownerName: 'Priya Gokhale',
    ownerPhone: '916666555444',
    address: 'Viman Nagar, Pune',
    lat: 18.5689,
    lng: 73.9167,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
    ],
  },
]

const currency = (value) => `₹${value.toLocaleString('en-IN')}`

function App() {
  const [activeScreen, setActiveScreen] = useState('qr')
  const [search, setSearch] = useState('')
  const [activeCollegeId, setActiveCollegeId] = useState(colleges[0].id)
  const [activeType, setActiveType] = useState('PG')
  const [onlyBudget, setOnlyBudget] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState('sunrise-pg')
  const [activeImage, setActiveImage] = useState(0)
  const [scannerText, setScannerText] = useState('Activate Camera Scanner')

  const activeCollege = colleges.find((college) => college.id === activeCollegeId)

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const inCollege = property.collegeId === activeCollegeId
      const inType = property.type === activeType
      const inBudget = onlyBudget ? property.rent <= 8000 : true
      return inCollege && inType && inBudget
    })
  }, [activeCollegeId, activeType, onlyBudget])

  const selectedProperty =
    properties.find((property) => property.id === selectedPropertyId) ?? properties[0]

  const searchedColleges = colleges.filter((college) => {
    const haystack = `${college.name} ${college.location}`.toLowerCase()
    return haystack.includes(search.toLowerCase())
  })

  const openListing = (propertyId) => {
    setSelectedPropertyId(propertyId)
    setActiveImage(0)
    setActiveScreen('details')
  }

  const onActivateScanner = () => {
    setScannerText('Starting lens engine...')
    window.setTimeout(() => {
      setScannerText('QR Detected: MIT-WPU Pune')
      setActiveCollegeId('mit-wpu')
      setActiveScreen('map')
    }, 900)
  }

  const detailsImages = selectedProperty.images

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Stayable</h1>
          <p>0% brokerage • verified student stays</p>
        </div>
        <select
          value={activeCollegeId}
          onChange={(event) => setActiveCollegeId(event.target.value)}
          aria-label="Select college"
        >
          {colleges.map((college) => (
            <option key={college.id} value={college.id}>
              {college.name}
            </option>
          ))}
        </select>
      </header>

      <main>
        {activeScreen === 'qr' && (
          <section className="screen stack">
            <div className="hero-card">
              <h2>Scan College QR Code</h2>
              <p>
                Scan a campus QR or search manually to auto-load nearby PGs and Flats around your
                college.
              </p>
              <button type="button" className="primary" onClick={onActivateScanner}>
                {scannerText}
              </button>
            </div>

            <div className="stack">
              <label htmlFor="college-search">Search college</label>
              <input
                id="college-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="MIT-WPU, COEP, Symbiosis..."
              />
              {searchedColleges.map((college) => (
                <article key={college.id} className="card">
                  <div>
                    <h3>{college.name}</h3>
                    <p>{college.location}</p>
                    <small>{college.activeHubs} active hubs</small>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCollegeId(college.id)
                      setActiveScreen('map')
                    }}
                  >
                    Explore
                  </button>
                </article>
              ))}
              {!searchedColleges.length && <p>No colleges found.</p>}
            </div>
          </section>
        )}

        {activeScreen === 'map' && (
          <section className="screen stack">
            <div className="card">
              <h2>{activeCollege?.name} Map View</h2>
              <p>{filteredProperties.length} matching properties in radius</p>
            </div>

            <div className="map-box" role="img" aria-label="Property map preview">
              <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg">
                <rect width="360" height="240" fill="#e8edf5" />
                <path d="M0 120 C120 80, 240 140, 360 100" stroke="#fff" strokeWidth="14" />
                <path d="M0 120 C120 80, 240 140, 360 100" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="190" cy="110" r="16" fill="#2563eb" />
                <text x="175" y="115" fill="white" fontSize="8">
                  COLLEGE
                </text>
              </svg>
              <div className="markers">
                {filteredProperties.map((property) => (
                  <button
                    key={property.id}
                    type="button"
                    onClick={() => setSelectedPropertyId(property.id)}
                    className={selectedPropertyId === property.id ? 'selected' : ''}
                  >
                    {currency(property.rent)}
                  </button>
                ))}
              </div>
            </div>

            <article className="card highlighted">
              <h3>{selectedProperty.title}</h3>
              <p>{selectedProperty.distance}</p>
              <p>
                {currency(selectedProperty.rent)} • {selectedProperty.type}
              </p>
              <div className="row">
                <button type="button" onClick={() => openListing(selectedProperty.id)}>
                  View details
                </button>
                <button type="button" onClick={() => setActiveScreen('explore')}>
                  List view
                </button>
              </div>
            </article>
          </section>
        )}

        {activeScreen === 'explore' && (
          <section className="screen stack">
            <div className="card">
              <h2>Explore Nearby Accommodations</h2>
              <p>{activeCollege?.name}</p>
            </div>

            <div className="row">
              <button
                type="button"
                className={activeType === 'PG' ? 'primary' : ''}
                onClick={() => setActiveType('PG')}
              >
                PGs
              </button>
              <button
                type="button"
                className={activeType === 'Flat' ? 'primary' : ''}
                onClick={() => setActiveType('Flat')}
              >
                Flats
              </button>
              <button
                type="button"
                className={onlyBudget ? 'primary' : ''}
                onClick={() => setOnlyBudget((value) => !value)}
              >
                &lt; ₹8,000
              </button>
            </div>

            {filteredProperties.map((property) => (
              <article key={property.id} className="card">
                <h3>{property.title}</h3>
                <p>
                  {currency(property.rent)} • Deposit {currency(property.deposit)}
                </p>
                <p>{property.distance}</p>
                <small>{property.amenities.join(' • ')}</small>
                <div className="row">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPropertyId(property.id)
                      setActiveScreen('map')
                    }}
                  >
                    View on map
                  </button>
                  <button type="button" onClick={() => openListing(property.id)}>
                    Open
                  </button>
                </div>
              </article>
            ))}

            {!filteredProperties.length && (
              <article className="card">
                <p>No listings match this filter. Try changing budget/type.</p>
              </article>
            )}
          </section>
        )}

        {activeScreen === 'details' && (
          <section className="screen stack">
            <button type="button" className="ghost" onClick={() => setActiveScreen('explore')}>
              ← Back to listings
            </button>

            <div className="gallery">
              <img src={detailsImages[activeImage]} alt={selectedProperty.title} />
              <div className="row">
                <button
                  type="button"
                  onClick={() =>
                    setActiveImage((image) =>
                      image === 0 ? detailsImages.length - 1 : image - 1,
                    )
                  }
                >
                  Prev
                </button>
                <small>
                  {activeImage + 1}/{detailsImages.length}
                </small>
                <button
                  type="button"
                  onClick={() => setActiveImage((image) => (image + 1) % detailsImages.length)}
                >
                  Next
                </button>
              </div>
            </div>

            <article className="card highlighted">
              <h2>{selectedProperty.title}</h2>
              <p>
                {currency(selectedProperty.rent)} • {selectedProperty.type} • ⭐ {selectedProperty.rating}
              </p>
              <p>{selectedProperty.address}</p>
              <small>Room options: {selectedProperty.roomOptions.join(', ')}</small>
              <small>Amenities: {selectedProperty.amenities.join(', ')}</small>
            </article>

            <div className="card">
              <h3>Direct owner contact</h3>
              <p>{selectedProperty.ownerName}</p>
              <div className="stack">
                <a className="action" href={`tel:+${selectedProperty.ownerPhone}`}>
                  Call owner
                </a>
                <a
                  className="action"
                  href={`https://wa.me/${selectedProperty.ownerPhone}?text=Hi%20I%20am%20interested%20in%20${encodeURIComponent(selectedProperty.title)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
                <a
                  className="action"
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedProperty.lat},${selectedProperty.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      <nav className="bottom-nav" aria-label="Main navigation">
        <button type="button" onClick={() => setActiveScreen('qr')}>
          QR Scan
        </button>
        <button type="button" onClick={() => setActiveScreen('map')}>
          Map
        </button>
        <button type="button" onClick={() => setActiveScreen('explore')}>
          Explore
        </button>
        <button type="button" disabled>
          Saved
        </button>
        <button type="button" disabled>
          Profile
        </button>
      </nav>
    </div>
  )
}

export default App
