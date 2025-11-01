"use client"

import { useCallback, useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api'
const TEACHER_ID = 'teacher-1'

type Course = {
  id: string
  slug: string
  title: string
  students: number
  status: 'draft' | 'published'
  revenue: number
  sales: number
}

type Revenue = {
  total: number
  thisMonth: number
  chart: Array<{ month: string; amount: number }>
  breakdown: Array<{ courseId: string; courseName: string; revenue: number }>
}

type Ratings = {
  average: number
  total: number
  distribution: Record<number, number>
  recent: Array<{ id: string; author: string; rating: number; comment: string; course: string; date: string }>
}

type Tools = {
  installed: Array<{ id: string; name: string; status: 'active' | 'inactive'; installs: number }>
  available: Array<{ id: string; name: string; tagline: string }>
}

const currency = (value: number) => `¥${value.toLocaleString()}`

export default function TeacherDashboard() {
  const [courses, setCourses] = useState<Course[]>([])
  const [revenue, setRevenue] = useState<Revenue | null>(null)
  const [ratings, setRatings] = useState<Ratings | null>(null)
  const [tools, setTools] = useState<Tools | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'courses' | 'revenue' | 'ratings' | 'tools'>('courses')

  const [showCreate, setShowCreate] = useState(false)
  const [newCourseTitle, setNewCourseTitle] = useState('')
  const [newCoursePrice, setNewCoursePrice] = useState('299')
  const [creating, setCreating] = useState(false)
  const [actioning, setActioning] = useState(false)

  const fetchCourses = useCallback(async () => {
    const res = await fetch(`${API_BASE}/teachers/${TEACHER_ID}/courses`).then(r => r.json())
    setCourses(res.items || [])
    return res.items || []
  }, [])

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const [courseItems, revenueRes, ratingsRes, toolsRes] = await Promise.all([
      fetch(`${API_BASE}/teachers/${TEACHER_ID}/courses`).then(r => r.json()),
      fetch(`${API_BASE}/teachers/${TEACHER_ID}/revenue`).then(r => r.json()),
      fetch(`${API_BASE}/teachers/${TEACHER_ID}/ratings`).then(r => r.json()),
      fetch(`${API_BASE}/teachers/${TEACHER_ID}/tools`).then(r => r.json()),
    ])
    setCourses(courseItems.items || [])
    setRevenue(revenueRes)
    setRatings(ratingsRes)
    setTools(toolsRes)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const handleCreateCourse = async () => {
    if (!newCourseTitle.trim()) return
    setCreating(true)
    try {
      await fetch(`${API_BASE}/teachers/${TEACHER_ID}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newCourseTitle.trim(), price: Number(newCoursePrice) || 0 }),
      })
      await fetchAll()
      setShowCreate(false)
      setNewCourseTitle('')
      setNewCoursePrice('299')
    } finally {
      setCreating(false)
    }
  }

  const handleToggleStatus = async (course: Course) => {
    setActioning(true)
    try {
      const nextStatus = course.status === 'published' ? 'draft' : 'published'
      await fetch(`${API_BASE}/teachers/${TEACHER_ID}/courses/${course.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })
      await fetchCourses()
    } finally {
      setActioning(false)
    }
  }

  const handleRemoveCourse = async (course: Course) => {
    const confirmed = typeof window !== 'undefined' && window.confirm(`确定撤销课程 "${course.title}" 吗？`)
    if (!confirmed) return
    setActioning(true)
    try {
      await fetch(`${API_BASE}/teachers/${TEACHER_ID}/courses/${course.id}`, { method: 'DELETE' })
      await fetchAll()
    } finally {
      setActioning(false)
    }
  }

  const emptyState = loading ? '加载中...' : '暂无数据'

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
        <h1 className="text-2xl font-bold">教师工作台</h1>
        <p className="mt-1 text-sm text-gray-700">管理课程、查看收入、评价与合作工具。</p>
      </div>

      <div className="flex gap-2 border-b">
        <button onClick={() => setActiveTab('courses')} className={`px-4 py-2 font-medium ${activeTab === 'courses' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>课程</button>
        <button onClick={() => setActiveTab('revenue')} className={`px-4 py-2 font-medium ${activeTab === 'revenue' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>收入</button>
        <button onClick={() => setActiveTab('ratings')} className={`px-4 py-2 font-medium ${activeTab === 'ratings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>评价</button>
        <button onClick={() => setActiveTab('tools')} className={`px-4 py-2 font-medium ${activeTab === 'tools' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>合作工具</button>
      </div>

      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">我的课程</h2>
            <button onClick={() => setShowCreate(v => !v)} className="rounded bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700">
              {showCreate ? '收起' : '创建新课程'}
            </button>
          </div>

          {showCreate && (
            <div className="rounded-xl border bg-white p-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">课程标题</label>
                <input value={newCourseTitle} onChange={e => setNewCourseTitle(e.target.value)} placeholder="例如：AI绘本启蒙进阶" className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">价格 (¥)</label>
                <input value={newCoursePrice} onChange={e => setNewCoursePrice(e.target.value)} type="number" className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring" />
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => { setShowCreate(false); setNewCourseTitle(''); }} className="rounded border px-4 py-2 text-sm hover:bg-gray-50">取消</button>
                <button onClick={handleCreateCourse} disabled={creating} className="rounded bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700 disabled:opacity-60">
                  {creating ? '创建中...' : '创建'}
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {courses.length === 0 ? (
              <div className="rounded-xl border bg-white p-4 text-sm text-gray-500">{emptyState}</div>
            ) : (
              courses.map(course => (
                <div key={course.id} className="rounded-xl border bg-white p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <div className="mt-1 text-sm text-gray-600">学员：{course.students} · 状态：{course.status === 'published' ? '已发布' : '草稿'}</div>
                  </div>
                  <div className="md:text-right">
                    <div className="text-sm text-gray-600">收入：{currency(course.revenue)}</div>
                    <div className="text-xs text-gray-500">销量：{course.sales}</div>
                    <div className="mt-2 flex gap-2 justify-end flex-wrap">
                      <a href={`/course/${course.slug}`} className="rounded border px-3 py-1.5 text-xs hover:bg-gray-50">预览</a>
                      <button onClick={() => handleToggleStatus(course)} disabled={actioning} className="rounded bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700 disabled:opacity-60">
                        {course.status === 'published' ? '下架课程' : '发布课程'}
                      </button>
                      <button onClick={() => handleRemoveCourse(course)} disabled={actioning} className="rounded bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700 disabled:opacity-60">撤销课程</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'revenue' && revenue && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border bg-white p-4">
              <div className="text-sm text-gray-600">累计收入</div>
              <div className="text-2xl font-bold mt-1">{currency(revenue.total)}</div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="text-sm text-gray-600">本月收入</div>
              <div className="text-2xl font-bold mt-1">{currency(revenue.thisMonth)}</div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="text-sm text-gray-600">课程数</div>
              <div className="text-2xl font-bold mt-1">{revenue.breakdown.length}</div>
            </div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold mb-4">收入明细</h3>
            <div className="space-y-3">
              {revenue.breakdown.map(item => (
                <div key={item.courseId} className="flex justify-between items-center py-2 border-b last:border-0">
                  <span>{item.courseName}</span>
                  <span className="font-medium">{currency(item.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ratings' && ratings && (
        <div className="space-y-6">
          <div className="rounded-xl border bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold">{ratings.average.toFixed(1)}</div>
                <div className="text-sm text-gray-600">平均评分</div>
                <div className="text-xs text-gray-500 mt-1">共 {ratings.total} 条评价</div>
              </div>
              <div className="flex-1">
                <div className="space-y-1">
                  {[5,4,3,2,1].map(star => (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="w-8">{star}星</span>
                      <div className="flex-1 bg-gray-200 rounded h-2">
                        <div className="bg-yellow-500 h-2 rounded" style={{ width: `${((ratings.distribution[star] || 0) / ratings.total) * 100}%` }} />
                      </div>
                      <span className="text-gray-600 w-8 text-right">{ratings.distribution[star] || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold mb-4">最近评价</h3>
            <div className="space-y-4">
              {ratings.recent.map(item => (
                <div key={item.id} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.author}</span>
                    <span className="text-yellow-500">{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{item.comment}</p>
                  <div className="text-xs text-gray-500">{item.course} · {item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tools' && tools && (
        <div className="space-y-6">
          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold mb-4">已安装工具</h3>
            <div className="space-y-3">
              {tools.installed.map(tool => (
                <div key={tool.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-sm text-gray-600">课程中使用：{tool.installs} 次</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${tool.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {tool.status === 'active' ? '使用中' : '已停用'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold mb-4">可用工具</h3>
            <div className="space-y-3">
              {tools.available.map(tool => (
                <div key={tool.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-sm text-gray-600">{tool.tagline}</div>
                  </div>
                  <button className="rounded bg-blue-600 px-3 py-1.5 text-white text-sm hover:bg-blue-700">安装</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
