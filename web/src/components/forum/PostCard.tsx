import { useState } from 'react'
import { CommentList } from './CommentList'

type Post = {
  id: string
  title: string
  body: string
  author: string
  likes: number
  createdAt: string
  comments: { id: string; author: string; text: string; createdAt: string }[]
}

type Props = {
  post: Post
  onLike?: (id: string) => void
  onComment?: (id: string, text: string) => void
}

export function PostCard({ post, onLike, onComment }: Props) {
  const [expanded, setExpanded] = useState(true)
  return (
    <article className="rounded-xl border bg-white p-4">
      <header className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <div className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</div>
      </header>
      <div className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{post.body}</div>
      <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
        <span>作者：{post.author}</span>
        <button onClick={() => onLike?.(post.id)} className="rounded border px-2 py-1 hover:bg-gray-50">👍 {post.likes}</button>
        <button onClick={() => setExpanded(v => !v)} className="rounded border px-2 py-1 hover:bg-gray-50">{expanded ? '收起评论' : '展开评论'}</button>
      </div>
      {expanded && (
        <CommentList
          comments={post.comments}
          onAdd={(text) => onComment?.(post.id, text)}
        />
      )}
    </article>
  )
}
