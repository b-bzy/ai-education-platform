import { useState } from 'react'

type Props = {
  onSubmit?: (post: { title: string; body: string }) => void
}

export function PostComposer({ onSubmit }: Props) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async () => {
    if (!title.trim() || !body.trim()) return
    setBusy(true)
    try {
      onSubmit?.({ title: title.trim(), body: body.trim() })
      setTitle(''); setBody('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-xl border bg-white p-4">
      <h3 className="font-semibold">发布帖子 / 分享经验</h3>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="标题（例如：我们如何在家做AI启蒙绘本）"
        className="mt-3 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="正文内容..."
        rows={4}
        className="mt-2 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring"
      />
      <div className="mt-3 flex items-center justify-end gap-3">
        <button onClick={() => { setTitle(''); setBody('') }} className="rounded border px-3 py-2 text-sm hover:bg-gray-50">清空</button>
        <button onClick={submit} disabled={busy} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60">{busy ? '发布中...' : '发布'}</button>
      </div>
    </div>
  )
}
