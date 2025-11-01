"use client"

import { useEffect, useState } from 'react'
import { PostComposer } from '@/components/forum/PostComposer'
import { PostCard } from '@/components/forum/PostCard'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api'

export default function ParentsCommunityPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/posts`).then(r => r.json()).then(d => {
      setPosts(d.items)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const addPost = async (p: { title: string; body: string }) => {
    try {
      const res = await fetch(`${API_BASE}/posts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
      const data = await res.json()
      console.log('Post added:', data)
      setPosts(prev => [data.item, ...prev])
    } catch (err) {
      console.error('Failed to add post:', err)
    }
  }

  const likePost = async (id: string) => {
    await fetch(`${API_BASE}/posts/${id}/like`, { method: 'POST' })
    fetch(`${API_BASE}/posts`).then(r => r.json()).then(d => setPosts(d.items))
  }

  const addComment = async (id: string, text: string) => {
    await fetch(`${API_BASE}/posts/${id}/comments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
    fetch(`${API_BASE}/posts`).then(r => r.json()).then(d => setPosts(d.items))
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-gradient-to-r from-amber-50 to-rose-50 p-6">
        <h1 className="text-2xl font-bold">家长社区 · 经验分享与互动</h1>
        <p className="mt-1 text-sm text-gray-700">发布孩子AI启蒙的经验或问题，和其他家长交流互动。</p>
      </div>

      <PostComposer onSubmit={addPost} />

      {loading ? (
        <div className="text-sm text-gray-500">加载中...</div>
      ) : (
        <div className="space-y-4">
          {posts.map(p => (
            <PostCard key={p.id} post={p} onLike={likePost} onComment={addComment} />
          ))}
        </div>
      )}
    </div>
  )
}
