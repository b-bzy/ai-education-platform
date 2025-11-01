type Props = {
  name: string
  tagline: string
  updatedAt: string
}

export function ToolCard({ name, tagline, updatedAt }: Props) {
  return (
    <div className="rounded-xl border bg-white p-4 hover:shadow-sm transition-shadow">
      <h3 className="font-semibold">{name}</h3>
      <div className="mt-1 text-xs text-gray-500">最近更新：{new Date(updatedAt).toLocaleDateString()}</div>
      <p className="mt-2 text-sm text-gray-700 line-clamp-2">{tagline}</p>
      <div className="mt-3">
        <button className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50">了解工具</button>
      </div>
    </div>
  )
}
