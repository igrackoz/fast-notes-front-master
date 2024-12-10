
import { Navigate, Outlet } from "react-router-dom"

export default function AuthRoute() {

    const token = localStorage.getItem('token')

    if (!token) return <Navigate to="/auth/login" replace />

    return (
    <>
      
      <div className="max-w-5xl mx-auto mt-9 border border-gray-200 p-6 rounded-md bg-white shadow-inner">
        <Outlet/>
      </div>
    </>
  )
}
