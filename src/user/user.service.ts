import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  public async listUsers(): Promise<UserDocument[]> {
    return this.userModel.find({}, { password: 0 });
  }

  public async createUser(user: User): Promise<UserDocument> {
    const userCreated = await this.userModel.create(user);
    return this.userModel.findById(userCreated._id).select('-password').select('-salt');
  }

  public async findOne(email: string): Promise<UserDocument> {
    return this.userModel.findOne({
      email
    }).exec();
  }
}
