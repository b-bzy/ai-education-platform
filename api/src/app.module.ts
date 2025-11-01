import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { CoursesController } from './courses.controller'
import { OrdersController } from './orders.controller'
import { AgentController } from './agent.controller'
import { ToolsController } from './tools.controller'
import { PostsController } from './posts.controller'
import { TeachersController } from './teachers.controller'
import { DevelopersController } from './developers.controller'

@Module({
  imports: [],
  controllers: [HealthController, CoursesController, OrdersController, AgentController, ToolsController, PostsController, TeachersController, DevelopersController],
  providers: [],
})
export class AppModule {}
