import App from "@/App";
import Auth from "@/components/Auth";
import AuthRoute from "@/components/AuthRoute";
import Login from "@/components/Login";
import Profile from "@/components/Profile";
import Register from "@/components/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
export default function RoutesIndex() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthRoute />}>
                    <Route index element={<App />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/auth" element={<Auth />}>
                    <Route path="" element={<Navigate to={'login'} replace />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
