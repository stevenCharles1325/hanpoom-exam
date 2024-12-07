import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickingSlipModule } from './picking-slip/picking-slip.module';
import { PickingSlip } from './database/entities/picking-slip.entity';
import { PickingSlipItem } from './database/entities/picking-slip-item.entity';
import { PickingSlipDate } from './database/entities/picking-slip-date.entity';
import { PickingSlipService } from './picking-slip/picking-slip.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 5506,
      username: 'root',
      password: 'secret',
      database: 'hanpoom',
      entities: [PickingSlip, PickingSlipItem, PickingSlipDate],
    }),
    PickingSlipModule,
  ],
  controllers: [AppController],
  providers: [AppService, PickingSlipService],
})
export class AppModule {}
