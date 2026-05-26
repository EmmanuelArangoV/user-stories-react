import { useState } from 'react'
import type { FormEvent } from 'react'

interface TaskFormProps {
  onCreate: (title: string) => void
}

const TaskForm = ({ onCreate }: TaskFormProps) => {
  const [title, setTitle] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onCreate(title)
    setTitle('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="task-title">
        Nombre de la tarea
      </label>
      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Escribe una tarea"
        autoComplete="off"
      />
      <button type="submit" className="button button--primary">
        Crear
      </button>
    </form>
  )
}

export default TaskForm
