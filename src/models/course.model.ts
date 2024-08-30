import mongoose, { Schema, Document } from 'mongoose';

interface ICourse extends Document {
  name: string;
  price: number;
  rating: number;
  authorName: string;
  isBestSeller: boolean;
  shortDescription: string;
}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  authorName: { type: String, required: true },
  isBestSeller: { type: Boolean, required: true },
  shortDescription: { type: String, required: true },
});

const Course = mongoose.model<ICourse>('Course', CourseSchema);
export default Course;
