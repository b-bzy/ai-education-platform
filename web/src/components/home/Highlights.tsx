export function Highlights() {
  const items = [
    { k: '创作者', v: '10+' },
    { k: '家庭内测', v: '100+' },
    { k: 'AI 工具', v: '3+' },
  ]
  return (
    <section className="mx-auto max-w-6xl">
      <div className="grid grid-cols-3 gap-3 text-center">
        {items.map(i => (
          <div key={i.k} className="rounded-xl border bg-white p-5">
            <div className="text-2xl font-bold text-gray-900">{i.v}</div>
            <div className="text-xs text-gray-600">{i.k}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
