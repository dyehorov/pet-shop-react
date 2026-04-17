import "./App.css"
import Layout from "./layout"
import { Routes, Route } from "react-router"
import Home from "./pages/home"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="districts" element={<Districts />} />
          <Route path="districts/:districtId" element={<District />} />
          <Route
            path="districts/:districtId/places/:placeId"
            element={<Place />}
          />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </>
  )
}
