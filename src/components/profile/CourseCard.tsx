import React from 'react';
import { Card } from '@/components/ui/card';
interface CourseCardProps {
  id: number;
  title: string;
  author: string;
  likes: number;
  comments: number;
  views: number;
  imagePath?: string;
}
const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  author,
  likes,
  comments,
  views,
  imagePath
}) => {
  return <div className="main">
      <Card className="card">
        <div className="fl">
          <div className="fullscreen">
            
          </div>
        </div>
        <div className="card_content">
          <label className="switch_738">
            <input type="checkbox" className="chk_738" />
            <span className="slider_738"></span>
          </label>
        </div>
        <div className="card_back"></div>
      </Card>
      <div className="data">
        <div className="img">
          {imagePath ? <img src={imagePath} alt={title} className="w-full h-full object-cover" /> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
              <g strokeWidth="2.00" fill="none" strokeLinecap="butt">
                <path stroke="#59afb1" d="M 14.06 0.00 Q 13.33 4.09 13.93 7.52 A 1.04 1.02 -78.7 0 0 14.37 8.19 L 32.87 20.19"></path>
                <path stroke="#4fa6a8" d="M 32.87 20.19 L 42.25 26.79"></path>
                <path stroke="#69cbc0" d="M 42.25 26.79 C 41.40 28.26 24.14 34.92 21.32 36.20"></path>
                <path stroke="#6fcdbb" d="M 21.32 36.20 Q 15.81 38.21 11.00 41.21"></path>
                <path stroke="#5ec8ab" d="M 11.00 41.21 L 9.75 40.96"></path>
                <path stroke="#5cae9e" d="M 9.75 40.96 Q 5.99 37.71 1.71 35.19 A 1.00 1.00 0.0 0 0 0.22 35.85 L 0.00 36.94"></path>
                <path stroke="#3190a6" d="M 79.95 6.12 L 62.46 11.32"></path>
                <path stroke="#3a96a3" d="M 62.46 11.32 Q 47.42 14.67 32.87 20.19"></path>
                <path stroke="#22a3be" d="M 80.00 11.06 L 64.50 17.46"></path>
                <path stroke="#28879d" d="M 64.50 17.46 L 62.46 11.32"></path>
                <path stroke="#2ba9bb" d="M 64.50 17.46 L 43.00 26.96"></path>
                <path stroke="#4ab2b2" d="M 43.00 26.96 L 42.25 26.79"></path>
                <path stroke="#45ced3" d="M 80.00 52.31 Q 71.64 45.91 62.46 40.67"></path>
                <path stroke="#13636e" d="M 62.46 40.67 Q 62.43 36.88 58.50 36.79"></path>
                <path stroke="#45ced3" d="M 58.50 36.79 Q 50.07 32.95 43.00 26.96"></path>
                <path stroke="#326b65" d="M 58.50 36.79 Q 55.85 40.04 56.86 44.07 C 57.53 46.71 60.02 47.68 61.77 45.19 Q 61.91 44.99 61.94 44.74 L 62.46 40.67"></path>
                <path stroke="#59d4b5" d="M 40.81 79.86 Q 46.22 74.94 52.34 70.94 A 1.00 1.00 0.0 0 0 52.39 69.30 Q 44.74 63.65 43.10 62.62 Q 34.11 56.98 32.50 55.79"></path>
                <path stroke="#6ad8c5" d="M 32.50 55.79 C 36.74 55.42 30.64 48.79 29.79 47.81 C 27.54 45.21 26.34 42.09 24.05 39.44 Q 22.66 37.82 21.32 36.20"></path>
                <path stroke="#326b65" d="M 48.75 39.07 A 2.30 2.30 0.0 0 0 46.45 36.77 L 46.05 36.77 A 2.30 2.30 0.0 0 0 43.75 39.07 L 43.75 44.21 A 2.30 2.30 0.0 0 0 46.05 46.51 L 46.45 46.51 A 2.30 2.30 0.0 0 0 48.75 44.21 L 48.75 39.07"></path>
                <path stroke="#326b65" d="M 58.63 54.41 C 54.90 57.18 50.72 56.87 46.91 54.39 A 1.00 0.99 51.9 0 0 46.04 54.28 C 42.37 55.52 43.88 58.13 46.28 59.41 Q 53.38 63.20 60.15 58.94 C 62.54 57.43 62.47 54.80 59.41 54.23 A 1.00 1.00 0.0 0 0 58.63 54.41"></path>
                <path stroke="#4bb793" d="M 9.75 40.96 Q 5.15 43.50 0.05 44.46"></path>
                <path stroke="#5fd6b0" d="M 32.50 55.79 L 11.00 41.21"></path>
                <path stroke="#48d08e" d="M 11.19 80.00 Q 12.51 79.61 11.57 78.67 Q 5.99 73.11 1.70 65.70 C 1.28 64.97 0.74 64.76 0.00 65.19"></path>
              </g>
            </svg>}
        </div>
        <div className="text">
          
          
        </div>
      </div>
      <div className="btns">
        
        <div className="comments">
          
          <span className="comments_text">{comments}</span>
        </div>
        <div className="views">
          
          <span className="views_text">{views}</span>
        </div>
      </div>
    </div>;
};
export default CourseCard;