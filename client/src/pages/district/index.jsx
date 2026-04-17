import { useParams, Link, Navigate } from "react-router-dom"
import { districtsData } from "../../data.js"

function District() {
  const { districtId } = useParams()

  const district = districtsData.find(district => district.id === districtId)

  return (
    <div className="district-page">
      <div className="district-header">
        <Link to="/districts" className="back-link">
          ← Back to Districs
        </Link>
        <h1>{district.name}</h1>
        <p className="district-description">{district.description}</p>
      </div>

      <div className="places-section">
        <h2>District Attractions</h2>
        <div className="places-grid">
          {district.places.map(place => (
            <Link
              to={`/districts/${districtId}/places/${place.id}`}
              key={place.id}
              className="place-card"
            >
              <div className="place-emoji">{place.image}</div>
              <div className="place-info">
                <h3>{place.name}</h3>
                <p>{place.description.substring(0, 60)}...</p>
                <span className="view-details">Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default District
