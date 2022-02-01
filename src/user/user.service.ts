import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

import { User, UserCredentials, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async login(credentials: UserCredentials) {
    const user = await this.userModel.findOne({ email: credentials.email });

    if (!user) {
      throw new HttpException(
        'The username or password is not correct.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const match = await compare(credentials.password, user.password);

    if (!match) {
      throw new HttpException(
        'The username or password is not correct.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { _id, email, name, surname } = user;

    return {
      _id,
      email,
      name,
      surname,
    };
  }

  async signup(user: User) {
    if (!(user.email && user.password)) {
      throw new HttpException(
        'Data not formatted properly',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);

    user.password = hashedPassword;

    const newUser = new this.userModel(user);

    await newUser.save();

    const { _id, email, name, surname } = newUser;

    return {
      _id,
      email,
      name,
      surname,
    };
  }
}
