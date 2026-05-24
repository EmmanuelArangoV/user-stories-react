import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import EmptyState from './components/EmptyState'
import { loadTasks, saveTasks } from './utils/storage'
import { formatDuration } from './utils/time'
import type { Task } from './types'

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  const [now, setNow] = useState(() => Date.now())
  const [message, setMessage] = useState<string | null>(null)

  const activeTaskId = useMemo(
    () => tasks.find((task) => task.status === 'inprogress')?.id ?? null,
    [tasks],
  )

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  useEffect(() => {
    if (!activeTaskId) return

    const intervalId = window.setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [activeTaskId])

  useEffect(() => {
    if (!message) return
    const timeoutId = window.setTimeout(() => setMessage(null), 3000)
    return () => window.clearTimeout(timeoutId)
  }, [message])

  const handleCreate = (title: string) => {
    const cleanTitle = title.trim()
    if (!cleanTitle) return

    setTasks((prev) => [
      {
        id: crypto.randomUUID(),
        title: cleanTitle,
        status: 'pending',
        timeMs: 0,
        startedAt: null,
      },
      ...prev,
    ])
  }

  const handleStart = (id: string) => {
    if (activeTaskId && activeTaskId !== id) {
      setMessage('Solo una tarea puede estar en progreso al mismo tiempo.')
      return
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: 'inprogress', startedAt: Date.now() }
          : task,
      ),
    )
  }

  const handleFinish = (id: string) => {
    const finishTime = Date.now()

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task
        const elapsed = task.startedAt ? finishTime - task.startedAt : 0
        return {
          ...task,
          status: 'done',
          timeMs: task.timeMs + elapsed,
          startedAt: null,
        }
      }),
    )
  }

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const getTimeLabel = (task: Task) => {
    const elapsed =
      task.status === 'inprogress' && task.startedAt
        ? now - task.startedAt
        : 0

    // Mantiene el tiempo acumulado y suma el tramo activo si aplica.
    return formatDuration(task.timeMs + elapsed)
  }

  return (
    <div className="app">
      <Header />
      <TaskForm onCreate={handleCreate} />
      {message ? (
        <div className="message" role="status" aria-live="polite">
          {message}
        </div>
      ) : null}
      {tasks.length ? (
        <TaskList
          tasks={tasks}
          getTimeLabel={getTimeLabel}
          onStart={handleStart}
          onFinish={handleFinish}
          onDelete={handleDelete}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

export default App
