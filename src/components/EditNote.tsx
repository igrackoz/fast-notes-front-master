"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { date, z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { API } from "@/services/api"
import { format } from "date-fns"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { cn } from "@/lib/utils"
import Modal from "./Modal"
import { useEffect } from "react"

const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: date()
})

interface Props {
  setrefresh: React.Dispatch<React.SetStateAction<number>>,
  closeModal: () => void,
  open: boolean,
  id: string | null
}

export function EditNote({ setrefresh, closeModal, open, id }: Props) {


    
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined
    },
  })

  useEffect(() => {
    
    if (id) {
      API.get(`/notes/${id}`)
        .then(({data}) => {
            const { title, description, date } = data.message
            form.setValue('title', title)
            form.setValue('description', description)
            form.setValue('date',  new Date(date))
        })
    }

    return () => {
      form.reset()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  


  async function onSubmit(info: z.infer<typeof FormSchema>) {
    const { data } = await API.put(`/notes/${id}`, info)
    toast.success(data.message)
    setrefresh(refresh => refresh + 1)
    closeModal()
  }

  return (
    <Modal open={open} setOpen={closeModal} title={'Edit note'} description={'Edit a note in your list'}>
         <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
   
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Note</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
              
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </Modal>
  )
}
