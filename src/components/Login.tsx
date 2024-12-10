

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { API } from "@/services/api"
import { toast } from "sonner"

const FormSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(4, "Password must be at least 4 characters long"),
})


export default function Login() {

    const navigation = useNavigate()


    const {  handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async(info: z.infer<typeof FormSchema>) => {
        try {
             const { data } = await API.post('/login', info)
            localStorage.setItem('token', data.message)

            navigation('/',{ replace: true })
            
        } catch (error) {
            console.log(error);
            toast.error('Invalid email or password')
        }
    }

  return (
    <Card className="w-[500px] mx-auto ">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>welcome to your notes app</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input {...register("email", { required: true })} placeholder="example@example.com" />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input {...register("password", { required: true })} placeholder="********" />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>
          </div>
            <Button className="block  w-full h-12 mt-4">Log in</Button>
          <Link to="/auth/register" className="text-gray-500 text-sm text-center block mt-5 hover:underline">Don't have an account? Sign up</Link>
        </form>
      </CardContent>
    </Card>
  )
}
