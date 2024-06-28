import SideNav from "./helper/SideNav"
import LoginPage from "./helper/Login"

function MySpace() {
  return (
<div 
    style={{
        background: `
          url(https://image.tmdb.org/t/p/original//H5HjE7Xb9N09rbWn1zBfxgI8uz.jpg)`,
          backgroundSize: "cover",
          }}
          className="w-full h-full"
          >
      <LoginPage/>
      </div>
  )
}

export default MySpace
