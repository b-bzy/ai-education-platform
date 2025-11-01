import { useState } from 'react'

type Comment = { id: string; author: string; text: string; createdAt: string }

type Props = {
  comments: Comment[]
  onAdd?: (text: string) => void
}

export function CommentList({ comments, onAdd }: Props) {
  const [text, setText] = useState('')

  const submit = () => {
    if (!text.trim()) return
    onAdd?.(text.trim())
    setText('')
  }

  return (
    <div className="mt-3 rounded-lg border bg-gray-50 p-3">
      <div className="space-y-2">
        {comments.length === 0 ? (
          <div className="text-xs text-gray-500">暂无评论，来抢沙发吧~</div>
        ) : comments.map(c => (
          <div key={c.id} className="rounded bg-white p-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-800">{c.author}</div>
              <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
            </div>
            <div className="mt-1 text-gray-700 whitespace-pre-wrap">{c.text}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="写下你的评论..."
          className="flex-1 rounded border px-3 py-2 text-sm focus:outline-none focus:ring"
        />
        <button onClick={submit} className="rounded bg-blue-600 px-3 py-2 text-white text-sm hover:bg-blue-700">评论</button>
      </div>
    </div>
  )
}
