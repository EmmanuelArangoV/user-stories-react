import Card from './Card'
import type { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
  getTimeLabel: (task: Task) => string
  onStart: (id: string) => void
  onFinish: (id: string) => void
  onDelete: (id: string) => void
}

const TaskList = ({ tasks, getTimeLabel, onStart, onFinish, onDelete }: TaskListProps) => (
  <section className="task-list">
    {tasks.map((task) => (
      <Card
        key={task.id}
        title={task.title}
        status={task.status}
        time={getTimeLabel(task)}
        onStart={() => onStart(task.id)}
        onFinish={() => onFinish(task.id)}
        onDelete={() => onDelete(task.id)}
      />
    ))}
  </section>
)

export default TaskList

