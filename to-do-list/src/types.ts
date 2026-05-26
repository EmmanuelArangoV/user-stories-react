export type TaskStatus = 'pending' | 'inprogress' | 'done'

export interface Task {
  id: string
  title: string
  status: TaskStatus
  timeMs: number
  startedAt: number | null
}

