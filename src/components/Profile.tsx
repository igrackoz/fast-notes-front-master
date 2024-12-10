import { API } from "@/services/api"
import { UserType } from "@/types"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { toast } from "sonner"

export default function Profile() {

    const [user, setUser] = useState<UserType | null>(null)
    const [uploadFileStatus, setuploadFileStatus] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!uploadFileStatus) {
            API.get('/user')
                .then((res) => setUser(res.data.message))
        }
    }, [uploadFileStatus])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        try {
            const { data } = await API.put('/upload', formData)
            toast.success(data.message)
            setuploadFileStatus(false)
        } catch (error) {
            console.log(error)
            toast.error('Error uploading image')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/auth/login',{replace: true})
    }

    return (
        <>
            <Link to="/" replace className="text-gray-500 inline-flex items-center mb-4 text-sm gap-2">
                <ArrowLeft width={18} />
                Back to home
            </Link>

            <div>
                <h1 className="font-semibold text-xl">Profile</h1>
                <p className="mt-1 text-gray-500">
                    This is your profile page.
                </p>
            </div>
            <div className="mt-8">
                <h2 className="font-semibold text-lg">User info</h2>
                <p className="mt-1 text-gray-500">
                    <span className="font-semibold text-black">Username: </span>
                    {user?.user}
                </p>
                <p className="mt-1 text-gray-500">
                    <span className="font-semibold text-black">Email: </span>
                    {user?.email}
                </p>
                <p className="mt-1 text-gray-500">
                    <span className="font-semibold text-black">Image: </span>
                    {
                        user?.image ?
                            <img src={`${import.meta.env.VITE_API_URL}/${user?.image}`} alt="user" className="w-20 h-20 rounded-sm object-cover" />
                            :
                            <span className="text-gray-500">No image uploaded</span>
                    }
                </p>
                <div className="mt-4">
                    {uploadFileStatus && <div className="flex items-center gap-4">
                        <form onSubmit={handleSubmit} className="grid gap-3">
                            <Input type="file" name="image" placeholder="New username" className="w-full" />
                            <div className="grid grid-cols-2 gap-4">
                                <Button onClick={() => setuploadFileStatus(false)} variant={'outline'}>Cancel</Button>
                                <Button type="submit" variant={'secondary'} >Upload</Button>
                            </div>
                        </form>
                    </div>}
                    {!uploadFileStatus && <Button variant={'secondary'} onClick={() => setuploadFileStatus(true)}>Upload image</Button>}
                </div>

                <div className="mt-10">
                        <Button onClick={handleLogout} variant={'destructive'}>Log out</Button>
                </div>
            </div>
        </>
    )
}
