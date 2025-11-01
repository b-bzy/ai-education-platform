import { Controller, Get, Param, Query } from '@nestjs/common'

@Controller('courses')
export class CoursesController {
  @Get()
  list(@Query('q') q?: string, @Query('limit') limit?: string) {
    const items = [
      { id: 'c-1', slug: 'ai-picture-book', title: 'AI 绘本启蒙', teacher: '北京大学 陈教授', age: '4-6岁', summary: '通过绘本与语音互动，培养语言表达与创造力。' },
      { id: 'c-2', slug: 'ai-and-nature', title: '小小科学家：AI与自然', teacher: '清华大学 李教授', age: '6-8岁', summary: '认识AI的基本概念，用实验探索世界。' },
      { id: 'c-3', slug: 'blocks-to-ai', title: '编程启蒙：积木到AI', teacher: '中科院计算所 张教授', age: '7-10岁', summary: '从可视化编程到简单AI应用，动手做项目。' },
    ]
    const filtered = q ? items.filter(x => x.title.includes(q) || x.summary.includes(q)) : items
    const n = Math.max(1, Math.min(20, parseInt(limit || '3', 10)))
    return { items: filtered.slice(0, n), query: q ?? null }
  }

  @Get(':slug')
  detail(@Param('slug') slug: string) {
    const courses: Record<string, any> = {
      'ai-picture-book': {
        id: 'c-1',
        slug: 'ai-picture-book',
        title: 'AI 绘本启蒙',
        teacher: '北京大学 陈教授',
        teacherBio: '北京大学教育学院教授，专注儿童认知发展与AI教育融合研究。发表多篇SCI论文，主持国家社科基金项目。',
        age: '4-6岁',
        summary: '通过绘本与语音互动，培养语言表达与创造力。',
        description: '本课程结合AI技术与经典绘本，通过语音对话、故事接龙、角色扮演等互动形式，激发4-6岁儿童的语言表达兴趣与创造力。课程涵盖语音识别基础、故事创作、情感表达等内容，旨在为孩子们打开AI世界的大门。',
        syllabus: [
          { module: '模块一：初识AI绘本', lessons: ['什么是AI绘本', 'AI如何讲故事', '互动初体验'] },
          { module: '模块二：故事创作', lessons: ['故事结构', '角色设计', '情节编排'] },
          { module: '模块三：语音互动', lessons: ['语音对话', '故事接龙', '角色扮演'] },
        ],
        duration: '8周',
        price: 299,
      },
      'ai-and-nature': {
        id: 'c-2',
        slug: 'ai-and-nature',
        title: '小小科学家：AI与自然',
        teacher: '清华大学 李教授',
        teacherBio: '清华大学计算机系教授，AI教育应用专家。曾获教育部科技进步一等奖，长期致力于AI在教育场景的创新应用。',
        age: '6-8岁',
        summary: '认识AI的基本概念，用实验探索世界。',
        description: '通过观察自然现象与AI实验相结合，帮助6-8岁儿童理解AI的基本原理，培养科学思维与动手能力。课程包括图像识别、自然语言处理等基础概念，以及围绕动植物、天气、星空等主题的趣味实验。',
        syllabus: [
          { module: '模块一：认识AI', lessons: ['AI是什么', 'AI能做什么', '生活中的AI'] },
          { module: '模块二：自然探索', lessons: ['观察动植物', '天气预测', '星空识别'] },
          { module: '模块三：AI实验', lessons: ['图像识别实验', '语音识别实验', '智能问答'] },
        ],
        duration: '10周',
        price: 399,
      },
      'blocks-to-ai': {
        id: 'c-3',
        slug: 'blocks-to-ai',
        title: '编程启蒙：积木到AI',
        teacher: '中科院计算所 张教授',
        teacherBio: '中科院计算技术研究所研究员，少儿编程教育专家。编写多本编程启蒙教材，参与制定中小学编程课程标准。',
        age: '7-10岁',
        summary: '从可视化编程到简单AI应用，动手做项目。',
        description: '从可视化积木编程入手，逐步引导7-10岁儿童理解编程逻辑，最终完成简单的AI应用项目。课程涵盖顺序、循环、条件判断等编程基础，以及机器学习、图像处理等AI应用，通过项目实战培养计算思维。',
        syllabus: [
          { module: '模块一：编程基础', lessons: ['积木编程入门', '顺序与循环', '条件判断'] },
          { module: '模块二：项目实战', lessons: ['小游戏制作', '动画创作', '交互设计'] },
          { module: '模块三：AI应用', lessons: ['智能识别', '语音控制', 'AI助手'] },
        ],
        duration: '12周',
        price: 499,
      },
    }
    const item = courses[slug]
    return item ? { ...item } : { error: 'not found' }
  }
}
