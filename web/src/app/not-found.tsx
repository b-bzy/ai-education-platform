export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto py-16 text-center">
      <h2 className="text-xl font-semibold">页面不存在</h2>
      <p className="mt-2 text-gray-600">我们没有找到你请求的页面。</p>
      <a href="/" className="mt-6 inline-block rounded border px-4 py-2 hover:bg-gray-50">返回首页</a>
    </div>
  )
}
