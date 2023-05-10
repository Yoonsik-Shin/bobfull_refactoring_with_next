import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  collection: 'chat',
  timestamps: true,
};

@Schema(options)
export class Chat extends Document {
  @Prop({ requried: true })
  message: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
