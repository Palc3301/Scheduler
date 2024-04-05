import { Controller, Get, Post, Put, Delete, Body, Param, Request } from '@nestjs/common';
import { ServiceOfferingService } from './serviceOffering.service';
import { ServiceOffering, ServiceOfferingDocument } from '../schema/serviceOffering.schema';

@Controller('serviceOfferings')
export class ServiceOfferingController {
  constructor(private readonly serviceOfferingService: ServiceOfferingService) {}

  @Get()
  async listServiceOfferings(): Promise<ServiceOfferingDocument[]> {
    return this.serviceOfferingService.listServiceOfferings();
  }

  @Post()
  async createServiceOffering(@Request() req, @Body() serviceOffering: ServiceOffering): Promise<ServiceOffering> {
    const { sub } = req.user;
    return this.serviceOfferingService.createServiceOffering({ client: sub, ...serviceOffering });
  }

  @Put(':id')
  async updateServiceOffering(
    @Param('id') idServiceOffering: string,
    @Body() serviceOffering: ServiceOffering,
  ): Promise<void> {
    await this.serviceOfferingService.updateServiceOffering(idServiceOffering, serviceOffering);
  }

  @Delete(':id')
  async deleteServiceOffering(@Param('id') idServiceOffering: string): Promise<void> {
    await this.serviceOfferingService.deleteServiceOffering(idServiceOffering);
  }
}
