"use client"
import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import EmptyState from '../components/EmptyState'
import { loadTasks, saveTasks } from '../utils/storage'
import { formatDuration } from '../utils/time'
import type { Task } from '../types'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [now, setNow] = useState<number>(0)
  const [message, setMessage] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTasks(loadTasks())
      setNow(Date.now())
      setIsMounted(true)
    }, 0)
    return () => clearTimeout(timerId)
  }, [])

  const activeTaskId = useMemo(
    () => tasks.find((task) => task.status === 'inprogress')?.id ?? null,
    [tasks],
  )

  useEffect(() => {
    if (isMounted) saveTasks(tasks)
  }, [tasks, isMounted])

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

    return formatDuration(task.timeMs + elapsed)
  }

  if (!isMounted) {
    return null
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



