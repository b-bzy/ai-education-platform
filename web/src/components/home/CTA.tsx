export function CTA() {
  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-semibold">今天就开始 AI 启蒙之旅</h3>
            <p className="text-white/90">加入首批创作者与家庭，体验互动式学习与成长记录。</p>
          </div>
          <div className="flex gap-3">
            <a href="/parents/home" className="rounded-lg bg-white px-4 py-2 text-blue-700 hover:bg-white/90">家长入口</a>
            <a href="/teacher/dashboard" className="rounded-lg border border-white/40 px-4 py-2 hover:bg-white/10">教师入驻</a>
          </div>
        </div>
      </div>
    </section>
  )
}
