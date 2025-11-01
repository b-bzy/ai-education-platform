export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            AI 少儿启蒙，一站式学习与创作平台
          </h1>
          <p className="mt-4 text-gray-700">
            为宝妈宝爸、教师创作者与 AI 工具开发者而生：发现优质课程、记录成长、共创互动式启蒙体验。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/discover" className="rounded-lg bg-blue-600 px-5 py-2.5 text-white shadow hover:bg-blue-700">开始学习</a>
            <a href="/parents/home" className="rounded-lg border px-5 py-2.5 hover:bg-white/60">家长入口</a>
            <a href="/dev/dashboard" className="rounded-lg border px-5 py-2.5 hover:bg-white/60">发布工具</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl"/>
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-purple-200/40 blur-3xl"/>
    </section>
  )
}
