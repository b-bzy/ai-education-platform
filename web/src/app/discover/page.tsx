"use client"

import { useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api'

type Course = { id: string; slug: string; title: string; teacher: string; age: string; summary: string }
type Tool = { id: string; name: string; tagline: string; updatedAt: string }

export default function DiscoverPage() {
  const [courses, setCourses] = useState<Course[] | null>(null)
  const [tools, setTools] = useState<Tool[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const [c, t] = await Promise.all([
          fetch(`${API_BASE}/courses?limit=3`).then(r => r.json()),
          fetch(`${API_BASE}/tools?limit=3`).then(r => r.json()),
        ])
        setCourses(c.items)
        setTools(t.items)
      } catch (e) {
        setError('数据加载失败，请稍后重试。')
      }
    }
    run()
  }, [])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <h1 className="text-2xl font-bold">开始学习 · 推荐</h1>
        <p className="mt-1 text-sm text-gray-700">左侧为老师课程推荐，右侧为最新的教育类AI工具。</p>
      </div>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {!courses ? (
            <div className="text-sm text-gray-500">课程加载中...</div>
          ) : courses.length === 0 ? (
            <div className="text-sm text-gray-500">暂无推荐课程</div>
          ) : courses.map(c => (
            <div key={c.id} className="rounded-xl border bg-white p-4 hover:shadow-sm transition-shadow">
              <h3 className="font-semibold">{c.title}</h3>
              <div className="mt-1 text-xs text-gray-500">老师：{c.teacher} · 年龄：{c.age}</div>
              <p className="mt-2 text-sm text-gray-700">{c.summary}</p>
              <div className="mt-3">
                <a href={`/course/${c.slug}`} className="inline-block rounded bg-blue-600 px-3 py-1.5 text-white text-sm hover:bg-blue-700">查看课程</a>
              </div>
            </div>
          ))}
        </div>
        <aside className="space-y-3">
          {!tools ? (
            <div className="text-sm text-gray-500">工具加载中...</div>
          ) : tools.length === 0 ? (
            <div className="text-sm text-gray-500">暂无工具更新</div>
          ) : tools.map(t => (
            <div key={t.id} className="rounded-xl border bg-white p-4 hover:shadow-sm transition-shadow">
              <h3 className="font-semibold">{t.name}</h3>
              <div className="mt-1 text-xs text-gray-500">最近更新：{new Date(t.updatedAt).toLocaleDateString()}</div>
              <p className="mt-2 text-sm text-gray-700">{t.tagline}</p>
              <div className="mt-3">
                <button className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50">了解工具</button>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}
