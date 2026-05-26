import type { Task } from '../types'

const STORAGE_KEY = 'task-timer.tasks'

export const loadTasks = (): Task[] => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as Task[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter((task) => typeof task?.title === 'string')
  } catch {
    return []
  }
}

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

