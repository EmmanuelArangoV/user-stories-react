import { PlayIcon, StopIcon, TrashIcon } from './icons'
import type { TaskStatus } from '../types'

interface CardProps {
  title: string
  status: TaskStatus
  time: string
  onStart: () => void
  onFinish: () => void
  onDelete: () => void
}

const statusLabels: Record<TaskStatus, string> = {
  pending: 'Pending',
  inprogress: 'In Progress',
  done: 'Done',
}

const Card = ({ title, status, time, onStart, onFinish, onDelete }: CardProps) => (
  <article className={`card card--${status}`}>
    <div className="card__header">
      <div>
        <h3 className="card__title">{title}</h3>
        <span className={`status status--${status}`}>{statusLabels[status]}</span>
      </div>
      <div className="card__time">{time}</div>
    </div>
    <div className="card__actions">
      {status === 'pending' ? (
        <button className="button" type="button" onClick={onStart}>
          <PlayIcon className="icon" />
          Iniciar
        </button>
      ) : null}
      {status === 'inprogress' ? (
        <button className="button" type="button" onClick={onFinish}>
          <StopIcon className="icon" />
          Finalizar
        </button>
      ) : null}
      <button
        className="button button--ghost"
        type="button"
        onClick={onDelete}
      >
        <TrashIcon className="icon" />
        Eliminar
      </button>
    </div>
  </article>
)

export default Card

