import { Body, Controller, Get, Post } from '@nestjs/common'
import { spawn, ChildProcessWithoutNullStreams } from 'node:child_process'

const procs: { web?: ChildProcessWithoutNullStreams; api?: ChildProcessWithoutNullStreams } = {}

function startWeb(cwd: string) {
  if (procs.web && !procs.web.killed) return 'already-running'
  const p = spawn(process.env.SHELL || '/bin/zsh', ['-lc', 'source "$HOME/.nvm/nvm.sh" >/dev/null 2>&1 || true; nvm use 18 >/dev/null 2>&1 || true; PORT=3001 npm run dev:web'], { cwd, env: process.env })
  procs.web = p
  return 'started'
}

function startApi(cwd: string) {
  if (procs.api && !procs.api.killed) return 'already-running'
  const p = spawn(process.env.SHELL || '/bin/zsh', ['-lc', 'source "$HOME/.nvm/nvm.sh" >/dev/null 2>&1 || true; nvm use 18 >/dev/null 2>&1 || true; PORT=3002 npm run dev:api'], { cwd, env: process.env })
  procs.api = p
  return 'started'
}

function stopProc(kind: 'web' | 'api') {
  const p = procs[kind]
  if (!p) return 'not-running'
  try {
    p.kill('SIGTERM')
    return 'stopped'
  } catch {
    return 'error'
  }
}

@Controller('agent')
export class AgentController {
  @Get('status')
  status() {
    return {
      web: !!(procs.web && !procs.web.killed),
      api: !!(procs.api && !procs.api.killed),
    }
  }

  @Post('start')
  start(@Body() body: { target?: 'web' | 'api' | 'all' }) {
    const target = body?.target ?? 'all'
    const root = process.cwd().endsWith('/api') ? process.cwd().replace(/\/api$/, '') : process.cwd() + '/..'
    const cwd = root
    const results: Record<string, string> = {}
    if (target === 'web' || target === 'all') results.web = startWeb(cwd)
    if (target === 'api' || target === 'all') results.api = startApi(cwd)
    return { results }
  }

  @Post('stop')
  stop(@Body() body: { target?: 'web' | 'api' | 'all' }) {
    const target = body?.target ?? 'all'
    const results: Record<string, string> = {}
    if (target === 'web' || target === 'all') results.web = stopProc('web')
    if (target === 'api' || target === 'all') results.api = stopProc('api')
    return { results }
  }
}
