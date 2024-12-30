import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';

@Controller('math')
export class MathController {
  @MessagePattern({ cmd: 'sum' })
  accumulate(numbers: number[]) {
    console.log('Adding ' + numbers);
    return (numbers ?? []).reduce((a, b) => a + b);
  }

  @EventPattern('user_created')
  handleRegisterUser(data: Record<string, unknown>) {
    console.log(data);
  }

  @EventPattern('lot_casted')
  handleLotCasted(num: number) {
    console.log('Lot casted from lighthouse:', num);
  }

  @MessagePattern({ cmd: 'time.us.*' })
  getDate(@Payload() data: number[], @Ctx() context: NatsContext) {
    console.log(data);
    return new Date().toLocaleTimeString();
  }
}
