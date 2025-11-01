import { Controller, Get, Query } from '@nestjs/common'

@Controller('tools')
export class ToolsController {
  @Get()
  list(@Query('limit') limit?: string) {
    const n = Math.max(1, Math.min(20, parseInt(limit || '3', 10)))
    const now = new Date().toISOString()
    const items = [
      { id: 'tool-1', name: 'AI 绘本生成器', tagline: '输入关键词生成适龄绘本与配音', updatedAt: now },
      { id: 'tool-2', name: '少儿语音对话助手', tagline: '口语互动与角色扮演练习', updatedAt: now },
      { id: 'tool-3', name: '编程积木·AI包', tagline: 'Scratch风格AI组件插件', updatedAt: now },
    ].slice(0, n)
    return { items }
  }
}
