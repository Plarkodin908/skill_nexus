
import React from 'react';
import { Bookmark } from 'lucide-react';

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
  // Calculate a description based on the stats
  const description = `${comments} Video - ${views} min`;
  
  // Define background gradient
  const backgroundStyle = imagePath 
    ? { backgroundImage: `url(${imagePath})`, backgroundSize: 'cover' }
    : { background: 'linear-gradient(#e66465, #9198e5)' };

  return (
    <div className="course-card">
      <div className="img" style={backgroundStyle}>
        <div className="save">
          <Bookmark className="svg" size={15} />
        </div>
      </div>
      
      <div className="text">
        <h3>{title}</h3>
        <p>{description}</p>
        
        <div className="icon-box">
          <svg version="1.1" className="svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 512.001 512.001" style={{enableBackground: "new 0 0 512.001 512.001"}}>
            <path style={{fill: "#3D6687"}} d="M165,68.715l-26.327-26.327l37.363-37.363c3.739-3.739,9.801-3.739,13.54,0l12.786,12.786
              c3.739,3.739,3.739,9.801,0,13.54L165,68.715z"></path>
            <path style={{fill: "#3D6687"}} d="M234.998,101.725l-26.327-26.327l37.363-37.363c3.739-3.739,9.801-3.739,13.54,0l12.786,12.786
              c3.739,3.739,3.739,9.801,0,13.54L234.998,101.725z"></path>
            <path style={{fill: "#3D6687"}} d="M445.507,349.222l26.327,26.327l37.363-37.363c3.739-3.739,3.739-9.801,0-13.54l-12.787-12.787
              c-3.739-3.739-9.801-3.739-13.54,0L445.507,349.222z"></path>
            <path style={{fill: "#3D6687"}} d="M408.054,279.224l26.327,26.327l37.363-37.363c3.739-3.739,3.739-9.801,0-13.54l-12.786-12.786
              c-3.739-3.739-9.801-3.739-13.54,0L408.054,279.224z"></path>
            <path style={{fill: "#CCDFED"}} d="M443.378,458.836L276.261,234.948L52.372,67.83c-7.845-5.856-8.673-17.309-1.75-24.232
              l22.953-22.954c10.277-10.277,25.733-13.35,39.158-7.785l272.626,112.989l112.989,272.626c5.564,13.427,2.491,28.882-7.785,39.158
              l-22.953,22.953C460.688,467.51,449.234,466.683,443.378,458.836z"></path>
            <path style={{fill: "#CCDFED"}} d="M181.785,507.029L104.93,404.848L2.75,327.993c-3.349-2.518-3.694-7.418-0.73-10.381l11.782-11.782
              c7.939-7.939,19.965-10.129,30.193-5.499l113.895,51.558l51.558,113.895c4.63,10.228,2.439,22.254-5.499,30.193l-11.783,11.782
              C189.203,510.722,184.303,510.378,181.785,507.029z"></path>
            <path style={{fill: "#61AFF6"}} d="M104.914,432.283L104.914,432.283c-17.494,8.348-35.767-9.925-27.419-27.419l0,0
              c18.554-38.883,42.253-75.095,70.46-107.661L341.791,73.417c28.676-33.108,69.054-53.832,112.672-57.831l11.885-1.089
              c16.568-1.519,30.453,12.365,28.935,28.934l-1.089,11.885c-3.999,43.617-24.724,83.995-57.831,112.672L212.576,361.824
              C180.009,390.03,143.799,413.73,104.914,432.283z"></path>
          </svg>
          <span>Business Trip</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
