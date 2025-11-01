type Props = {
  onStartAll?: () => void
  onStopAll?: () => void
  onHealthCheck?: () => void
}

export function ControlBar({ onStartAll, onStopAll, onHealthCheck }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button onClick={onStartAll} className="rounded bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700">启动前后端</button>
      <button onClick={onStopAll} className="rounded border px-4 py-2 hover:bg-gray-50">停止所有</button>
      <button onClick={onHealthCheck} className="rounded border px-3 py-2 text-sm hover:bg-gray-50">健康检查</button>
    </div>
  )
}
