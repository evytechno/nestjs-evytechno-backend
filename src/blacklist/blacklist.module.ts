import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';

@Module({
  providers: [BlacklistService]
})
export class BlacklistModule {}
