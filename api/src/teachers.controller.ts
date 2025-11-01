import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'

const store: Record<string, {
  courses: Array<{
    id: string
    slug: string
    title: string
    students: number
    status: 'draft' | 'published'
    revenue: number
    sales: number
  }>,
  revenue: {
    total: number
    thisMonth: number
    chart: Array<{ month: string; amount: number }>
  },
  ratings: {
    average: number
    total: number
    distribution: Record<number, number>
    recent: Array<{ id: string; author: string; rating: number; comment: string; course: string; date: string }>
  },
  tools: {
    installed: Array<{ id: string; name: string; status: 'active' | 'inactive'; installs: number }>
    available: Array<{ id: string; name: string; tagline: string }>
  }
}> = {
  'teacher-1': {
    courses: [
      { id: 'c-1', slug: 'ai-picture-book', title: 'AI 绘本启蒙', students: 125, status: 'published', revenue: 37250, sales: 125 },
      { id: 'c-2', slug: 'ai-and-nature', title: '小小科学家：AI与自然', students: 89, status: 'published', revenue: 35511, sales: 89 },
    ],
    revenue: {
      total: 72761,
      thisMonth: 15800,
      chart: [
        { month: '2024-01', amount: 12000 },
        { month: '2024-02', amount: 15000 },
        { month: '2024-03', amount: 18000 },
        { month: '2024-04', amount: 15800 },
      ],
    },
    ratings: {
      average: 4.7,
      total: 156,
      distribution: { 5: 98, 4: 45, 3: 10, 2: 2, 1: 1 },
      recent: [
        { id: 'r1', author: '家长A', rating: 5, comment: '课程很棒，孩子很喜欢！', course: 'AI 绘本启蒙', date: '2024-04-15' },
        { id: 'r2', author: '家长B', rating: 4, comment: '内容丰富，互动性强。', course: '小小科学家：AI与自然', date: '2024-04-10' },
        { id: 'r3', author: '家长C', rating: 5, comment: '教授讲解清晰，推荐！', course: 'AI 绘本启蒙', date: '2024-04-08' },
      ],
    },
    tools: {
      installed: [
        { id: 'tool1', name: 'AI 绘本生成器', status: 'active', installs: 85 },
        { id: 'tool2', name: '少儿语音对话助手', status: 'active', installs: 120 },
      ],
      available: [
        { id: 'tool3', name: '编程积木·AI包', tagline: 'Scratch风格AI组件插件' },
      ],
    },
  },
}

function ensureTeacher(id: string) {
  if (!store[id]) {
    store[id] = JSON.parse(JSON.stringify(store['teacher-1']))
    store[id].courses = []
  }
  return store[id]
}

@Controller('teachers')
export class TeachersController {
  @Get(':id/courses')
  getCourses(@Param('id') id: string) {
    const teacher = ensureTeacher(id)
    return { items: teacher.courses }
  }

  @Delete(':id/courses/:courseId')
  removeCourse(@Param('id') id: string, @Param('courseId') courseId: string) {
    const teacher = ensureTeacher(id)
    const index = teacher.courses.findIndex(c => c.id === courseId)
    if (index === -1) return { error: 'not found' }
    const [removed] = teacher.courses.splice(index, 1)
    return { item: removed }
  }

  @Post(':id/courses')
  createCourse(@Param('id') id: string, @Body() body: { title: string; price?: number }) {
    const teacher = ensureTeacher(id)
    const course = {
      id: `c-${Date.now()}`,
      slug: `course-${Date.now()}`,
      title: body.title || '未命名课程',
      students: 0,
      status: 'draft' as const,
      revenue: 0,
      sales: 0,
    }
    teacher.courses = [course, ...teacher.courses]
    return { item: course }
  }

  @Patch(':id/courses/:courseId')
  updateCourse(@Param('id') id: string, @Param('courseId') courseId: string, @Body() body: { status?: 'draft' | 'published'; title?: string }) {
    const teacher = ensureTeacher(id)
    const course = teacher.courses.find(c => c.id === courseId)
    if (!course) return { error: 'not found' }
    if (body.status) course.status = body.status
    if (body.title) course.title = body.title
    return { item: course }
  }

  @Get(':id/revenue')
  getRevenue(@Param('id') id: string) {
    const teacher = ensureTeacher(id)
    return {
      total: teacher.revenue.total,
      thisMonth: teacher.revenue.thisMonth,
      chart: teacher.revenue.chart,
      breakdown: teacher.courses.map(c => ({ courseId: c.id, courseName: c.title, revenue: c.revenue })),
    }
  }

  @Get(':id/ratings')
  getRatings(@Param('id') id: string) {
    const teacher = ensureTeacher(id)
    return teacher.ratings
  }

  @Get(':id/tools')
  getTools(@Param('id') id: string) {
    const teacher = ensureTeacher(id)
    return teacher.tools
  }
}
