"use client"

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { PostCard } from '@/components/forum/PostCard'

function uid() { return Math.random().toString(36).slice(2) }

export default function ParentsHome() {
  const [posts] = useState(() => [
    { id: uid(), title: '开学季如何安排AI启蒙？', body: '分享一份我们家的时间表与工具清单。', author: '家长·L', likes: 2, createdAt: new Date().toISOString(), comments: [] }
  ])
  const list = useMemo(() => posts, [posts])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-gradient-to-r from-emerald-50 to-cyan-50 p-6">
        <h1 className="text-2xl font-bold">家长入口</h1>
        <p className="mt-1 text-sm text-gray-700">在这里浏览社区、记录成长、发现适合孩子的课程与工具。</p>
        <div className="mt-3 flex gap-3 text-sm">
          <Link href="/parents/community" className="rounded border px-3 py-2 hover:bg-white">进入家长社区</Link>
          <Link href="/discover" className="rounded border px-3 py-2 hover:bg-white">开始学习（课程与工具推荐）</Link>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold">社区最新</h2>
        <div className="mt-3 space-y-3">
          {list.map(p => (<PostCard key={p.id} post={{...p, comments: p.comments}} />))}
        </div>
        <div className="mt-3 text-right">
          <Link href="/parents/community" className="text-sm text-blue-600 hover:underline">查看更多 →</Link>
        </div>
      </div>
    </div>
  )
}
