type Props = {
  title: string
  teacher: string
  age: string
  summary: string
}

export function CourseCard({ title, teacher, age, summary }: Props) {
  return (
    <div className="rounded-xl border bg-white p-4 hover:shadow-sm transition-shadow">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-1 text-xs text-gray-500">老师：{teacher} · 年龄：{age}</div>
      <p className="mt-2 text-sm text-gray-700 line-clamp-2">{summary}</p>
      <div className="mt-3">
        <button className="rounded bg-blue-600 px-3 py-1.5 text-white text-sm hover:bg-blue-700">查看课程</button>
      </div>
    </div>
  )
}
