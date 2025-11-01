import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: process.env.FRONTEND_URL 
      ? [process.env.FRONTEND_URL, /^http:\/\/localhost:\d+$/]
      : true, // 开发环境允许所有来源
    credentials: true
  })
  const port = parseInt(process.env.PORT || '3001', 10)
  await app.listen(port)
}
bootstrap()
