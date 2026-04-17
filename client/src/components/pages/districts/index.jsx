import { Link } from "react-router-dom"
import { districtsData } from "../../data.js"

function Districts() {
  return (
    <div className="districts">
      <h1>City Districts</h1>
      <p className="subtitle">
        Select a district to learn about its attractions
      </p>

      <div className="districts-grid">
        {districtsData.map(district => (
          <Link
            to={`/districts/${district.id}`}
            key={district.id}
            className="district-card"
          >
            <h2>{district.name}</h2>
            <p>{district.description}</p>
            <div className="card-footer">
              <span className="places-count">
                {district.places.length}{" "}
                {district.places.length === 1 ? "place" : "places"}
              </span>
              <span className="view-link">Learn more →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Districts
