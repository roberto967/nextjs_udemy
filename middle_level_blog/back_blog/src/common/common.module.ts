import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptHashingService } from './hashing/bcrypt-hashing.service';

// TODO: Documentar essa questão de usar o HashingService como provider abstrato

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptHashingService,
    },
  ],
  exports: [HashingService],
})
export class CommonModule {}
