import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "./ui/button"
import { NoteType } from "@/types"
import { PencilIcon, Trash } from "lucide-react"
import { API } from "@/services/api"
import { toast } from "sonner"
import { format } from "date-fns"
interface Props{
    node:NoteType,
    setRefresh: React.Dispatch<React.SetStateAction<number>>,
    setid: React.Dispatch<React.SetStateAction<null | string>>
}

export default function Note({node, setRefresh, setid}:Props) {

    const { _id, title, description, date } = node

    const handleDelete = async() => {
        const { data } = await API.delete(`/notes/${_id}`)
        toast.success(data.message) 
        setRefresh(refresh => refresh + 1)
    }



  return (
    <Card>
    <CardHeader>
      <div className="flex items-center gap-2 justify-between">
        <CardTitle>{title}</CardTitle>
        <span className="text-sm text-gray-400">{ format( new Date(date), "PPP") }</span>
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription>
        {description}
      </CardDescription>
    </CardContent>
    <CardFooter className="flex justify-end items-center gap-2">
      <Button variant={'outline'} onClick={handleDelete}> <Trash/> Delete</Button>
      <Button onClick={() => setid(_id)}> <PencilIcon/> Edit</Button>
    </CardFooter>
  </Card>
  )
}
