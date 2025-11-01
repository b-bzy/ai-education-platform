import { Body, Controller, Get, Param, Post } from '@nestjs/common'

let posts = [
  {
    id: '1',
    title: '我们家的AI绘本睡前仪式',
    body: '固定时间+对话接龙，孩子参与感很高，欢迎交流。',
    author: '家长·小林',
    likes: 5,
    createdAt: new Date().toISOString(),
    comments: [
      { id: 'c1', author: '家长A', text: '太有参考价值了！', createdAt: new Date().toISOString() },
    ],
  },
  {
    id: '2',
    title: '开学季如何安排AI启蒙？',
    body: '分享一份我们家的时间表与工具清单。',
    author: '家长·L',
    likes: 2,
    createdAt: new Date().toISOString(),
    comments: [],
  },
]

@Controller('posts')
export class PostsController {
  @Get()
  list() {
    return { items: posts }
  }

  @Get(':id')
  get(@Param('id') id: string) {
    const item = posts.find(x => x.id === id)
    if (!item) return { error: 'not found' }
    return { item }
  }

  @Post()
  create(@Body() body: { title: string; body: string; author?: string }) {
    const item = {
      id: String(posts.length + 1),
      title: body.title,
      body: body.body,
      author: body.author || '家长·匿名',
      likes: 0,
      createdAt: new Date().toISOString(),
      comments: [],
    }
    posts = [item, ...posts]
    return { item }
  }

  @Post(':id/like')
  like(@Param('id') id: string) {
    const idx = posts.findIndex(x => x.id === id)
    if (idx >= 0) posts[idx].likes += 1
    return { ok: idx >= 0 }
  }

  @Post(':id/comments')
  addComment(@Param('id') id: string, @Body() body: { author?: string; text: string }) {
    const idx = posts.findIndex(x => x.id === id)
    if (idx < 0) return { error: 'not found' }
    const item = posts[idx]
    const comment = {
      id: `c${Date.now()}`,
      author: body.author || '我',
      text: body.text,
      createdAt: new Date().toISOString(),
    }
    item.comments.push(comment)
    return { item: comment }
  }
}

