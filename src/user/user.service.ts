import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserTypeEnum } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async listUsers(type: UserTypeEnum): Promise<UserDocument[]> {
    return this.userModel.find({ type }, { password: 0, schedules: 0 });
  }

  public async createUser(user: User): Promise<UserDocument> {
    const userCreated = await this.userModel.create(user);
    return this.findUserById(userCreated._id);
  }

  public async findOne(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  private async findUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).select('-password');
  }
}
