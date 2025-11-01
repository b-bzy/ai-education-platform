"use client"

import { useCallback, useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api'
const DEV_ID = 'dev-1'

type Tool = {
  id: string
  slug: string
  name: string
  tagline: string
  status: 'draft' | 'published'
  installs: number
  activeUsers: number
  revenue: number
  createdAt: string
  updatedAt: string
}

type Stats = {
  totalInstalls: number
  thisMonthInstalls: number
  totalRevenue: number
  thisMonthRevenue: number
  breakdown: Array<{
    toolId: string
    toolName: string
    installs: number
    activeUsers: number
    revenue: number
  }>
}

type Feedback = {
  average: number
  total: number
  distribution: Record<number, number>
  recent: Array<{
    id: string
    author: string
    rating: number
    comment: string
    tool: string
    date: string
  }>
}

const currency = (value: number) => `¥${value.toLocaleString()}`

export default function DevDashboard() {
  const [tools, setTools] = useState<Tool[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'tools' | 'stats' | 'feedback'>('tools')

  const [showCreate, setShowCreate] = useState(false)
  const [newToolName, setNewToolName] = useState('')
  const [newToolTagline, setNewToolTagline] = useState('')
  const [creating, setCreating] = useState(false)
  const [actioning, setActioning] = useState(false)

  const fetchTools = useCallback(async () => {
    const res = await fetch(`${API_BASE}/developers/${DEV_ID}/tools`).then(r => r.json())
    setTools(res.items || [])
    return res.items || []
  }, [])

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const [toolsRes, statsRes, feedbackRes] = await Promise.all([
      fetch(`${API_BASE}/developers/${DEV_ID}/tools`).then(r => r.json()),
      fetch(`${API_BASE}/developers/${DEV_ID}/stats`).then(r => r.json()),
      fetch(`${API_BASE}/developers/${DEV_ID}/feedback`).then(r => r.json()),
    ])
    setTools(toolsRes.items || [])
    setStats(statsRes)
    setFeedback(feedbackRes)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const handleCreateTool = async () => {
    if (!newToolName.trim()) return
    setCreating(true)
    try {
      await fetch(`${API_BASE}/developers/${DEV_ID}/tools`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newToolName.trim(), tagline: newToolTagline.trim() }),
      })
      await fetchAll()
      setShowCreate(false)
      setNewToolName('')
      setNewToolTagline('')
    } finally {
      setCreating(false)
    }
  }

  const handleToggleStatus = async (tool: Tool) => {
    setActioning(true)
    try {
      const nextStatus = tool.status === 'published' ? 'draft' : 'published'
      await fetch(`${API_BASE}/developers/${DEV_ID}/tools/${tool.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })
      await fetchAll()
    } finally {
      setActioning(false)
    }
  }

  const handleRemoveTool = async (tool: Tool) => {
    const confirmed = typeof window === 'undefined' ? true : window.confirm(`确定撤销工具 "${tool.name}" 吗？`)
    if (!confirmed) return
    setActioning(true)
    try {
      await fetch(`${API_BASE}/developers/${DEV_ID}/tools/${tool.id}`, { method: 'DELETE' })
      await fetchAll()
    } finally {
      setActioning(false)
    }
  }

  const emptyState = loading ? '加载中...' : '暂无数据'

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
        <h1 className="text-2xl font-bold">开发者控制台</h1>
        <p className="mt-1 text-sm text-gray-700">工具上架、安装量与反馈数据管理。</p>
      </div>

      <div className="flex gap-2 border-b">
        <button onClick={() => setActiveTab('tools')} className={`px-4 py-2 font-medium ${activeTab === 'tools' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>工具管理</button>
        <button onClick={() => setActiveTab('stats')} className={`px-4 py-2 font-medium ${activeTab === 'stats' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>数据统计</button>
        <button onClick={() => setActiveTab('feedback')} className={`px-4 py-2 font-medium ${activeTab === 'feedback' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>用户反馈</button>
      </div>

      {activeTab === 'tools' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">我的工具</h2>
            <button onClick={() => setShowCreate(v => !v)} className="rounded bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700">
              {showCreate ? '收起' : '上架新工具'}
            </button>
          </div>

          {showCreate && (
            <div className="rounded-xl border bg-white p-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">工具名称</label>
                <input value={newToolName} onChange={e => setNewToolName(e.target.value)} placeholder="例如：AI 绘本生成器" className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">工具简介</label>
                <input value={newToolTagline} onChange={e => setNewToolTagline(e.target.value)} placeholder="例如：输入关键词生成适龄绘本与配音" className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring" />
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => { setShowCreate(false); setNewToolName(''); setNewToolTagline(''); }} className="rounded border px-4 py-2 text-sm hover:bg-gray-50">取消</button>
                <button onClick={handleCreateTool} disabled={creating} className="rounded bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700 disabled:opacity-60">
                  {creating ? '创建中...' : '创建'}
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {tools.length === 0 ? (
              <div className="rounded-xl border bg-white p-4 text-sm text-gray-500">{emptyState}</div>
            ) : (
              tools.map(tool => (
                <div key={tool.id} className="rounded-xl border bg-white p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold">{tool.name}</h3>
                    <div className="mt-1 text-sm text-gray-600">{tool.tagline}</div>
                    <div className="mt-1 text-xs text-gray-500">安装量：{tool.installs} · 活跃用户：{tool.activeUsers} · 状态：{tool.status === 'published' ? '已上架' : '草稿'}</div>
                  </div>
                  <div className="md:text-right">
                    <div className="text-sm text-gray-600">收入：{currency(tool.revenue)}</div>
                    <div className="text-xs text-gray-500">更新时间：{new Date(tool.updatedAt).toLocaleDateString()}</div>
                    <div className="mt-2 flex gap-2 justify-end flex-wrap">
                      <button onClick={() => handleToggleStatus(tool)} disabled={actioning} className="rounded bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700 disabled:opacity-60">
                        {tool.status === 'published' ? '下架工具' : '上架工具'}
                      </button>
                      <button onClick={() => handleRemoveTool(tool)} disabled={actioning} className="rounded bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700 disabled:opacity-60">撤销工具</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'stats' && stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border bg-white p-4">
              <div className="text-sm text-gray-600">累计安装量</div>
              <div className="text-2xl font-bold mt-1">{stats.totalInstalls}</div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="text-sm text-gray-600">本月安装量</div>
              <div className="text-2xl font-bold mt-1">{stats.thisMonthInstalls}</div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="text-sm text-gray-600">累计收入</div>
              <div className="text-2xl font-bold mt-1">{currency(stats.totalRevenue)}</div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="text-sm text-gray-600">本月收入</div>
              <div className="text-2xl font-bold mt-1">{currency(stats.thisMonthRevenue)}</div>
            </div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold mb-4">工具数据明细</h3>
            <div className="space-y-3">
              {stats.breakdown.map(item => (
                <div key={item.toolId} className="border-b last:border-0 pb-3 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.toolName}</span>
                    <span className="text-sm text-gray-600">{currency(item.revenue)}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>安装：{item.installs}</span>
                    <span>活跃：{item.activeUsers}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feedback' && feedback && (
        <div className="space-y-6">
          <div className="rounded-xl border bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold">{feedback.average.toFixed(1)}</div>
                <div className="text-sm text-gray-600">平均评分</div>
                <div className="text-xs text-gray-500 mt-1">共 {feedback.total} 条反馈</div>
              </div>
              <div className="flex-1">
                <div className="space-y-1">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="w-8">{star}星</span>
                      <div className="flex-1 bg-gray-200 rounded h-2">
                        <div className="bg-yellow-500 h-2 rounded" style={{ width: `${((feedback.distribution[star] || 0) / feedback.total) * 100}%` }} />
                      </div>
                      <span className="text-gray-600 w-8 text-right">{feedback.distribution[star] || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold mb-4">最近反馈</h3>
            <div className="space-y-4">
              {feedback.recent.map(item => (
                <div key={item.id} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.author}</span>
                    <span className="text-yellow-500">{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{item.comment}</p>
                  <div className="text-xs text-gray-500">{item.tool} · {item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
