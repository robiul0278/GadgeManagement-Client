import { NavLink } from "react-router-dom"

const AuthNavigate = () => {


  return (
    <div>
        <span>You are already register <NavLink to="/login">please login</NavLink></span>
    </div>
  )
}

export default AuthNavigate;