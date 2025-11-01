const features = [
  {
    title: '优选启蒙课程',
    desc: '按年龄/主题/难度智能推荐，视频+互动任务，进度可追踪。',
    icon: '📚'
  },
  {
    title: '创作者友好',
    desc: '课程编辑器、优惠与返佣、口碑与评分，轻松打造个人IP。',
    icon: '✨'
  },
  {
    title: '工具生态',
    desc: 'AI 绘本、语音对话、编程积木等工具，可一键集成课程。',
    icon: '🧩'
  }
]

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border bg-white p-5">
            <div className="text-2xl">{f.icon}</div>
            <h3 className="mt-2 text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
