import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Case, CaseSchema } from './schema/case.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Case.name, schema: CaseSchema }]),
  ],
  providers: [CaseService],
  controllers: [CaseController],
})
export class CaseModule {}
