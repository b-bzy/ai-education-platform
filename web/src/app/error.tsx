"use client"

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // You can log the error to an error reporting service
    // console.error(error)
  }, [error])

  return (
    <div className="max-w-lg mx-auto py-16 text-center">
      <h2 className="text-xl font-semibold">出错了</h2>
      <p className="mt-2 text-gray-600">{error?.message || '发生未知错误。'}</p>
      <button
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={() => reset()}
      >
        重试
      </button>
    </div>
  )
}
