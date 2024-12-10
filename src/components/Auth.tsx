import { Navigate, Outlet } from "react-router-dom";

export default function Auth() {

  const token = localStorage.getItem('token')

  if (token) return <Navigate to="/" replace />

  console.log(token)
  

  return (
    <div className="min-h-screen flex items-center justify-center">
        <Outlet />
    </div> 
  )
}
