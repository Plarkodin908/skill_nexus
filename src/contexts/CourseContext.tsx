
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  author: string;
  price: number;
}

interface CourseContextType {
  courses: Course[];
  addCourse: (course: Course) => void;
  getCourse: (id: string) => Course | undefined;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const addCourse = (course: Course) => {
    setCourses((prevCourses) => [...prevCourses, course]);
  };

  const getCourse = (id: string) => {
    return courses.find((course) => course.id === id);
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, getCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
