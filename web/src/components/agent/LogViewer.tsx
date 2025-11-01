import { useEffect, useRef } from 'react'

type Props = { lines: string[] }

export function LogViewer({ lines }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [lines])
  return (
    <div ref={ref} className="h-56 w-full overflow-auto rounded border bg-white p-3 text-xs leading-relaxed">
      {lines.length === 0 ? (
        <div className="text-gray-400">暂无日志</div>
      ) : (
        lines.map((l, i) => (
          <pre key={i} className="whitespace-pre-wrap break-words">{l}</pre>
        ))
      )}
    </div>
  )
}
