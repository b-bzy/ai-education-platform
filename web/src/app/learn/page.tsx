"use client"

import { useMemo, useState } from 'react'
import { PostComposer } from '@/components/forum/PostComposer'
import { PostCard } from '@/components/forum/PostCard'

function uid() { return Math.random().toString(36).slice(2) }

export default function LearnPage() {
  const [posts, setPosts] = useState(() => {
    return [
      {
        id: uid(),
        title: '如何用AI讲绘本？',
        body: '我们家每晚睡前会用语音对话讲绘本，孩子很喜欢参与故事接龙。',
        author: '宝妈小林',
        likes: 3,
        createdAt: new Date().toISOString(),
        comments: [
          { id: uid(), author: '家长A', text: '接龙环节太棒了！', createdAt: new Date().toISOString() }
        ]
      }
    ]
  })

  const addPost = (p: { title: string; body: string }) => {
    setPosts(prev => [
      {
        id: uid(),
        title: p.title,
        body: p.body,
        author: '匿名用户',
        likes: 0,
        createdAt: new Date().toISOString(),
        comments: []
      },
      ...prev
    ])
  }

  const likePost = (id: string) => {
    setPosts(prev => prev.map(x => x.id === id ? { ...x, likes: x.likes + 1 } : x))
  }

  const addComment = (id: string, text: string) => {
    setPosts(prev => prev.map(x => x.id === id ? {
      ...x,
      comments: [...x.comments, { id: uid(), author: '我', text, createdAt: new Date().toISOString() }]
    } : x))
  }

  const list = useMemo(() => posts, [posts])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-gradient-to-r from-amber-50 to-rose-50 p-6">
        <h1 className="text-2xl font-bold">开始学习 · 经验共享社区</h1>
        <p className="mt-1 text-sm text-gray-700">发布帖子吸引讨论，或浏览他人的经验并参与互动评论。</p>
      </div>

      <PostComposer onSubmit={addPost} />

      <div className="space-y-4">
        {list.map(p => (
          <PostCard key={p.id} post={p} onLike={likePost} onComment={addComment} />
        ))}
      </div>
    </div>
  )
}
