import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResourceDocument = Resource & Document;

@Schema()
export class Resource {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
