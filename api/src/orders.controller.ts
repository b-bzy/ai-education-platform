import { Controller, Get, Param } from '@nestjs/common'

@Controller('orders')
export class OrdersController {
  @Get(':id')
  get(@Param('id') id: string) {
    return { id, status: 'created' }
  }
}
