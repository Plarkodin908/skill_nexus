
import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface PostTemplateProps {
  title: string;
  content: string;
  date: string;
  comments: number;
  likes: number;
  viewerCount: number;
  draggable?: boolean;
}

const PostTemplate: React.FC<PostTemplateProps> = ({
  title,
  content,
  date,
  comments,
  likes,
  viewerCount,
  draggable = true
}) => {
  return (
    <div className="task" draggable={draggable}>
      <div className="tags">
        <span className="tag">{title}</span>
        <button className="options">
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <p>{content}</p>
      <div className="stats">
        <div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth="2" d="M12 8V12L15 15"></path>
              <circle strokeWidth="2" r="9" cy="12" cx="12"></circle>
            </svg>
            {date}
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z"></path>
            </svg>
            {comments}
          </div>
          <div>
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-2.5 0 32 32">
              <path d="M0 10.284l0.505 0.36c0.089 0.064 0.92 0.621 2.604 0.621 0.27 0 0.55-0.015 0.836-0.044 3.752 4.346 6.411 7.472 7.060 8.299-1.227 2.735-1.42 5.808-0.537 8.686l0.256 0.834 7.63-7.631 8.309 8.309 0.742-0.742-8.309-8.309 7.631-7.631-0.834-0.255c-2.829-0.868-5.986-0.672-8.686 0.537-0.825-0.648-3.942-3.3-8.28-7.044 0.11-0.669 0.23-2.183-0.575-3.441l-0.352-0.549-8.001 8.001zM1.729 10.039l6.032-6.033c0.385 1.122 0.090 2.319 0.086 2.334l-0.080 0.314 0.245 0.214c7.409 6.398 8.631 7.39 8.992 7.546l-0.002 0.006 0.195 0.058 0.185-0.087c2.257-1.079 4.903-1.378 7.343-0.836l-13.482 13.481c-0.55-2.47-0.262-5.045 0.837-7.342l0.104-0.218-0.098-0.221-0.031 0.013c-0.322-0.632-1.831-2.38-7.498-8.944l-0.185-0.215-0.282 0.038c-0.338 0.045-0.668 0.069-0.981 0.069-0.595 0-1.053-0.083-1.38-0.176z"></path>
            </svg>
            {likes}
          </div>
        </div>
        <div className="viewer">
          {[...Array(Math.min(3, viewerCount))].map((_, index) => (
            <span key={index}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path strokeWidth="2" stroke="#ffffff" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"></path>
                <path strokeLinecap="round" strokeWidth="2" stroke="#ffffff" d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21"></path>
              </svg>
            </span>
          ))}
          {viewerCount > 3 && <span>+{viewerCount - 3}</span>}
        </div>
      </div>
    </div>
  );
};

export default PostTemplate;
