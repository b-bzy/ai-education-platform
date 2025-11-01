"use client"

import { useEffect, useMemo, useState } from 'react'
import { StatusBadge } from '@/components/agent/StatusBadge'
import { LogViewer } from '@/components/agent/LogViewer'
import { ControlBar } from '@/components/agent/ControlBar'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api'

export default function AgentPage() {
  const [logs, setLogs] = useState<string[]>([])
  const [statusWeb, setStatusWeb] = useState<'healthy'|'starting'|'stopped'|'error'>('starting')
  const [statusApi, setStatusApi] = useState<'healthy'|'starting'|'stopped'|'error'>('starting')

  const webOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'

  const append = (line: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}  ${line}`])

  const healthCheck = async () => {
    append('开始健康检查...')
    try {
      const web = await fetch('/api/health').then(r => ({ ok: r.ok }))
      setStatusWeb(web.ok ? 'healthy' : 'error')
      append(`Web /api/health: ${web.ok ? '200 OK' : '错误'}`)
    } catch (e) {
      setStatusWeb('error')
      append('Web 健康检查失败')
    }
    try {
      const api = await fetch(`${API_BASE}/health`).then(r => ({ ok: r.ok }))
      setStatusApi(api.ok ? 'healthy' : 'error')
      append(`API /api/health: ${api.ok ? '200 OK' : '错误'}`)
    } catch (e) {
      setStatusApi('error')
      append('API 健康检查失败')
    }
  }

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${API_BASE}/agent/status`).then(r => r.json())
      setStatusWeb(res.web ? 'healthy' : 'stopped')
      setStatusApi(res.api ? 'healthy' : 'stopped')
    } catch {
      // ignore
    }
  }

  useEffect(() => { healthCheck(); fetchStatus() }, [])

  const startAll = async () => {
    append('请求后端启动前后端服务...')
    try {
      const res = await fetch(`${API_BASE}/agent/start`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ target: 'all' }) }).then(r => r.json())
      append(`启动结果: ${JSON.stringify(res.results)}`)
      setStatusWeb('starting'); setStatusApi('starting')
      setTimeout(() => healthCheck(), 1500)
    } catch (e) {
      append('启动失败')
    }
  }

  const stopAll = async () => {
    append('请求后端停止前后端服务...')
    try {
      const res = await fetch(`${API_BASE}/agent/stop`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ target: 'all' }) }).then(r => r.json())
      append(`停止结果: ${JSON.stringify(res.results)}`)
      setStatusWeb('stopped'); setStatusApi('stopped')
    } catch (e) {
      append('停止失败')
    }
  }

  const allHealthy = useMemo(() => statusWeb === 'healthy' && statusApi === 'healthy', [statusWeb, statusApi])

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-6 border">
        <h1 className="text-2xl font-bold">Agent 控制面板</h1>
        <p className="text-sm text-gray-600 mt-1">管理本地开发服务、查看状态与日志。</p>
        <div className="mt-4"><ControlBar onStartAll={startAll} onStopAll={stopAll} onHealthCheck={healthCheck} /></div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border p-4 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Web 前端</h3>
            <StatusBadge status={statusWeb} label={statusWeb === 'healthy' ? '运行中' : statusWeb === 'starting' ? '启动中' : statusWeb === 'stopped' ? '已停止' : '异常'} />
          </div>
          <p className="text-sm text-gray-600 mt-2">{webOrigin}</p>
          <a className="mt-3 inline-block text-sm text-blue-600 hover:underline" href="/" target="_blank">打开首页</a>
        </div>
        <div className="rounded-lg border p-4 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">API 后端</h3>
            <StatusBadge status={statusApi} label={statusApi === 'healthy' ? '运行中' : statusApi === 'starting' ? '启动中' : statusApi === 'stopped' ? '已停止' : '异常'} />
          </div>
          <p className="text-sm text-gray-600 mt-2">{`${API_BASE}/health`}</p>
          <a className="mt-3 inline-block text-sm text-blue-600 hover:underline" href={`${API_BASE}/health`} target="_blank">打开健康检查</a>
        </div>
      </div>

      <div className="rounded-lg border p-4 bg-white">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">运行日志</h3>
          <button onClick={() => setLogs([])} className="text-sm text-gray-600 hover:underline">清空</button>
        </div>
        <LogViewer lines={logs} />
      </div>

      <div className={`rounded-lg border p-4 ${allHealthy ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
        <p className="text-sm">当前总状态：{allHealthy ? '一切正常 ✅' : '部分服务未就绪 ⚠️'}</p>
      </div>
    </div>
  )
}
