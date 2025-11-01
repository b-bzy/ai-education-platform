type Props = { status: 'healthy' | 'starting' | 'error' | 'stopped'; label?: string }

export function StatusBadge({ status, label }: Props) {
  const color =
    status === 'healthy' ? 'bg-green-100 text-green-800 border-green-200' :
    status === 'starting' ? 'bg-amber-100 text-amber-800 border-amber-200' :
    status === 'stopped' ? 'bg-gray-100 text-gray-800 border-gray-200' :
    'bg-red-100 text-red-800 border-red-200'
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === 'healthy' ? 'bg-green-500' : status === 'starting' ? 'bg-amber-500' : status === 'stopped' ? 'bg-gray-400' : 'bg-red-500'}`} />
      {label ?? status}
    </span>
  )
}
