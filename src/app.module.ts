import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickingSlipModule } from './picking-slip/picking-slip.module';
import { PickingSlip } from './database/entities/picking-slip.entity';
import { PickingSlipItem } from './database/entities/picking-slip-item.entity';
import { PickingSlipDate } from './database/entities/picking-slip-date.entity';
import { PickingSlipService } from './picking-slip/picking-slip.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [PickingSlip, PickingSlipItem, PickingSlipDate],
    }),
    PickingSlipModule,
  ],
  controllers: [AppController],
  providers: [AppService, PickingSlipService],
})
export class AppModule {}
