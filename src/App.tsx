
import { useEffect, useState } from 'react'
import './App.css'
import Note from "./components/Note"
import { NoteType } from './types'
import Action from './components/Action'
import { API } from './services/api'
import { EditNote } from './components/EditNote'
import Heading from './components/Heading'


function App() {

  const [notes, setNotes] = useState<NoteType[]>([]);
  const [id, setid] = useState<null | string>(null)
  const [refresh, setrefresh] = useState(0)

  useEffect(() => {
    API('/notes')
      .then((res) => setNotes(res.data.message))
  }, [refresh]);

  return (
    <>
      <Heading />

      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500 mt-10 mb-4'>Number of notes: {notes.length}</p>
        <Action setrefresh={setrefresh} />
      </div>

      <div className="grid grid-cols-3 gap-4 ">
        {notes.map((note) => (
          <Note key={note._id} node={note} setRefresh={setrefresh} setid={setid} />
        ))}
      </div>
      <EditNote closeModal={() => setid(null)} id={id} open={!!id} setrefresh={setrefresh} />

    </>
  )
}

export default App
