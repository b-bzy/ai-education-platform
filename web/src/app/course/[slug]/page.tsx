"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api'

type CourseDetail = {
  id: string
  slug: string
  title: string
  teacher: string
  teacherBio: string
  age: string
  summary: string
  description: string
  syllabus: Array<{ module: string; lessons: string[] }>
  duration: string
  price: number
}

export default function CourseDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/courses/${slug}`)
      .then(r => r.json())
      .then(d => {
        setCourse(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="text-sm text-gray-500">加载中...</div>
  if (!course) return <div className="text-sm text-gray-500">课程不存在</div>

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="mt-1 text-sm text-gray-700">{course.summary}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold mb-4">课程介绍</h2>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </section>

          <section className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold mb-4">主讲人介绍</h2>
            <div className="space-y-2">
              <p className="font-medium">{course.teacher}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{course.teacherBio}</p>
            </div>
          </section>

          <section className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold mb-4">课程大纲</h2>
            <div className="space-y-4">
              {course.syllabus.map((m, i) => (
                <div key={i} className="border-l-2 border-blue-500 pl-4">
                  <h3 className="font-medium">{m.module}</h3>
                  <ul className="mt-2 space-y-1">
                    {m.lessons.map((l, j) => (
                      <li key={j} className="text-sm text-gray-600">· {l}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-4 h-fit">
          <div className="rounded-xl border bg-white p-6 space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">¥{course.price}</div>
              <div className="text-sm text-gray-500 mt-1">课程价格</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">适合年龄：</span>
                <span>{course.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">课程时长：</span>
                <span>{course.duration}</span>
              </div>
            </div>
            <button className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700">
              立即购买
            </button>
            <button className="w-full rounded-lg border px-4 py-3 text-gray-700 hover:bg-gray-50">
              免费试听
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

