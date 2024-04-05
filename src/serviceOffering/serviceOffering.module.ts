import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceOfferingService } from './serviceOffering.service';
import { ServiceOffering, ServiceOfferingSchema } from '../schema/serviceOffering.schema';
import { ServiceOfferingController } from './serviceOffering.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: ServiceOffering.name, schema: ServiceOfferingSchema }])],
  controllers: [ServiceOfferingController],
  providers: [ServiceOfferingService],
  exports: [ServiceOfferingService],
})
export class ServiceOfferingModule {}
