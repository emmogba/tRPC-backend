import { Module } from '@nestjs/common';
import { TrpcModule } from './trpc/trpc.module';
import { ProductModule } from './products/products.module';


@Module({
  imports: [TrpcModule, ProductModule],
})
export class AppModule {}
