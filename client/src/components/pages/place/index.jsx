import { useParams, Link, Navigate } from "react-router-dom"
import { districtsData } from "../../data.js"

const Place = () => {
  const { districtId, placeId } = useParams()

  const district = districtsData.find(district => district.id === districtId)

  if (!district) {
    return <Navigate to="/404" replace />
  }

  const place = district.places.find(place => place.id === placeId)

  if (!place) {
    return (
      <div className="place-not-found">
        <h2>Place not found</h2>
        <p>
          Sorry, an attraction with this name does not exist in this district.
        </p>
        <Link to={`/districts/${districtId}`} className="back-button">
          Back to District
        </Link>
      </div>
    )
  }

  return (
    <div className="place-page">
      <div className="place-header">
        <Link to={`/districts/${districtId}`} className="back-link">
          ← Back to District
        </Link>
      </div>

      <div className="place-detail">
        <div className="place-emoji-large">{place.image}</div>
        <h1>{place.name}</h1>
        <p className="place-full-description">{place.description}</p>

        <div className="place-meta">
          <div className="meta-item">
            <span className="meta-label">District:</span>
            <Link to={`/districts/${districtId}`} className="meta-value">
              {district.name}
            </Link>
          </div>
        </div>

        <button onClick={() => window.history.back()} className="back-button">
          ← Back
        </button>
      </div>
    </div>
  )
}

export default Place
