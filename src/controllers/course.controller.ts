import { Request, Response } from 'express';
import Course from '../models/course.model';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, filter = '' } = req.query;

    let filterQuery = {};
    
    switch (filter) {
      case 'popular':
        filterQuery = { rating: { $gte: 4.5 } };
        break;
      case 'new':
        filterQuery = { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
        break;
      case 'trending':
        filterQuery = { ratingCount: { $gte: 1000 } };
        break;
      default:
        break;
    }

    const courses = await Course.find(filterQuery)
      .sort({ [filter === 'new' ? 'createdAt' : 'rating']: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Course.countDocuments(filterQuery);

    res.json({ total, page: Number(page), limit: Number(limit), courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};
