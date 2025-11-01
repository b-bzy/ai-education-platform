import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'

const store: Record<string, {
  tools: Array<{
    id: string
    slug: string
    name: string
    tagline: string
    status: 'draft' | 'published'
    installs: number
    activeUsers: number
    revenue: number
    createdAt: string
    updatedAt: string
  }>,
  stats: {
    totalInstalls: number
    thisMonthInstalls: number
    totalRevenue: number
    thisMonthRevenue: number
  },
  feedback: {
    average: number
    total: number
    distribution: Record<number, number>
    recent: Array<{
      id: string
      author: string
      rating: number
      comment: string
      tool: string
      date: string
    }>
  }
}> = {
  'dev-1': {
    tools: [
      { id: 'tool-1', slug: 'ai-picture-book-generator', name: 'AI 绘本生成器', tagline: '输入关键词生成适龄绘本与配音', status: 'published', installs: 85, activeUsers: 65, revenue: 8500, createdAt: '2024-01-15', updatedAt: '2024-04-20' },
      { id: 'tool-2', slug: 'voice-dialogue-assistant', name: '少儿语音对话助手', tagline: '口语互动与角色扮演练习', status: 'published', installs: 120, activeUsers: 98, revenue: 12000, createdAt: '2024-02-01', updatedAt: '2024-04-18' },
      { id: 'tool-3', slug: 'blocks-ai-pack', name: '编程积木·AI包', tagline: 'Scratch风格AI组件插件', status: 'draft', installs: 0, activeUsers: 0, revenue: 0, createdAt: '2024-04-25', updatedAt: '2024-04-25' },
    ],
    stats: {
      totalInstalls: 205,
      thisMonthInstalls: 32,
      totalRevenue: 20500,
      thisMonthRevenue: 3200,
    },
    feedback: {
      average: 4.6,
      total: 89,
      distribution: { 5: 52, 4: 28, 3: 7, 2: 1, 1: 1 },
      recent: [
        { id: 'f1', author: '林老师', rating: 5, comment: '绘本生成效果很好，孩子很喜欢！', tool: 'AI 绘本生成器', date: '2024-04-20' },
        { id: 'f2', author: '王老师', rating: 4, comment: '语音助手互动性强，课堂效果好。', tool: '少儿语音对话助手', date: '2024-04-18' },
        { id: 'f3', author: '陈老师', rating: 5, comment: '工具稳定，推荐使用。', tool: 'AI 绘本生成器', date: '2024-04-15' },
      ],
    },
  },
}

function ensureDeveloper(id: string) {
  if (!store[id]) {
    store[id] = JSON.parse(JSON.stringify(store['dev-1']))
    store[id].tools = []
    store[id].stats = { totalInstalls: 0, thisMonthInstalls: 0, totalRevenue: 0, thisMonthRevenue: 0 }
    store[id].feedback = { average: 0, total: 0, distribution: {}, recent: [] }
  }
  return store[id]
}

@Controller('developers')
export class DevelopersController {
  @Get(':id/tools')
  getTools(@Param('id') id: string) {
    const dev = ensureDeveloper(id)
    return { items: dev.tools }
  }

  @Post(':id/tools')
  createTool(@Param('id') id: string, @Body() body: { name: string; tagline?: string }) {
    const dev = ensureDeveloper(id)
    const now = new Date().toISOString()
    const slug = `tool-${Date.now()}`
    const tool = {
      id: `tool-${Date.now()}`,
      slug,
      name: body.name || '未命名工具',
      tagline: body.tagline || '',
      status: 'draft' as const,
      installs: 0,
      activeUsers: 0,
      revenue: 0,
      createdAt: now,
      updatedAt: now,
    }
    dev.tools = [tool, ...dev.tools]
    return { item: tool }
  }

  @Patch(':id/tools/:toolId')
  updateTool(@Param('id') id: string, @Param('toolId') toolId: string, @Body() body: { status?: 'draft' | 'published'; name?: string; tagline?: string }) {
    const dev = ensureDeveloper(id)
    const tool = dev.tools.find(t => t.id === toolId)
    if (!tool) return { error: 'not found' }
    if (body.status) tool.status = body.status
    if (body.name) tool.name = body.name
    if (body.tagline) tool.tagline = body.tagline
    tool.updatedAt = new Date().toISOString()
    return { item: tool }
  }

  @Delete(':id/tools/:toolId')
  removeTool(@Param('id') id: string, @Param('toolId') toolId: string) {
    const dev = ensureDeveloper(id)
    const index = dev.tools.findIndex(t => t.id === toolId)
    if (index === -1) return { error: 'not found' }
    const [removed] = dev.tools.splice(index, 1)
    return { item: removed }
  }

  @Get(':id/stats')
  getStats(@Param('id') id: string) {
    const dev = ensureDeveloper(id)
    return {
      ...dev.stats,
      breakdown: dev.tools.map(t => ({
        toolId: t.id,
        toolName: t.name,
        installs: t.installs,
        activeUsers: t.activeUsers,
        revenue: t.revenue,
      })),
    }
  }

  @Get(':id/feedback')
  getFeedback(@Param('id') id: string) {
    const dev = ensureDeveloper(id)
    return dev.feedback
  }
}

