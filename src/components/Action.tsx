import Modal from "./Modal"
import { useState } from "react"
import { SaveNote } from "./SaveNote"
import { PlusIcon } from "lucide-react"
import { Button } from "./ui/button"


export default function Action({ setrefresh }: { setrefresh: React.Dispatch<React.SetStateAction<number>> }) {

    const [open, setOpen] = useState(false)

    const onClose = () => setOpen(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <PlusIcon />
                Add
            </Button>
            <Modal open={open} setOpen={onClose} title={'Create new note'} description={'Add a new note to your list'}>
                <SaveNote setrefresh={setrefresh} closeModal={onClose} /> 
            </Modal>
        </>
    )
}
