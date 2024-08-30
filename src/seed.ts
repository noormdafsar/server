import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/course.model';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const courses = [
      {
        name: "Introduction to Machine Learning",
        price: 49.99,
        rating: 4.8,
        authorName: "Jane Doe",
        isBestSeller: true,
        shortDescription: "Learn the fundamentals of machine learning and build your first model.",
      },
      {
        name: "Advanced React with TypeScript",
        price: 79.99,
        rating: 4.6,
        authorName: "John Smith",
        isBestSeller: false,
        shortDescription: "Master React and TypeScript to build scalable and maintainable applications.",
      },
    ];

    await Course.insertMany(courses);

    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
