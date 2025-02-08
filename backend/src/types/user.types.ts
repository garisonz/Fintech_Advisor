import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  // This is a custom business identifier. In many cases, you might rely solely on the default _id.
  userId: string;
  // The following arrays will store ObjectId references.
  accounts: Types.ObjectId[];
  chatHistory: Types.ObjectId[];
}

// When creating a user, you might not provide the relationship arrays, so they are optional.
export interface CreateUserDto {
  userId: string;
  accounts?: string[];     // Accept as strings (valid ObjectId string) if provided.
  chatHistory?: string[];
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}
