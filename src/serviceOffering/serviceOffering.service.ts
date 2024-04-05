import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceOffering, ServiceOfferingDocument } from '../schema/serviceOffering.schema';

@Injectable()
export class ServiceOfferingService {
  constructor(@InjectModel(ServiceOffering.name) private serviceOfferingModel: Model<ServiceOffering>) {}

  public async listServiceOfferings(): Promise<ServiceOfferingDocument[]> {
    return this.serviceOfferingModel.find().populate('client', '-password');
  }

  public async createServiceOffering(serviceOffering: ServiceOffering): Promise<ServiceOfferingDocument> {
    const serviceOfferingCreated = await this.serviceOfferingModel.create(serviceOffering);
    return this.serviceOfferingModel.findById(serviceOfferingCreated._id);
  }

  public async updateServiceOffering(id: string, serviceOffering: ServiceOffering): Promise<ServiceOfferingDocument> {
    await this.serviceOfferingModel.updateOne({ _id: id }, serviceOffering);
    return this.serviceOfferingModel.findById(id);
  }

  public async deleteServiceOffering(id: string): Promise<void> {
    return this.serviceOfferingModel.findByIdAndDelete(id);
  }
}
