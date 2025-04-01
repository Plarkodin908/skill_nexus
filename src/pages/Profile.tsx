
import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CourseCard from '@/components/profile/CourseCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RatingButtons from '@/components/profile/RatingButtons';
import GenderSelection from '@/components/profile/GenderSelection';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import ProfileTheme from '@/components/profile/ProfileTheme';

const Profile = () => {
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [showGenderSelection, setShowGenderSelection] = useState(false);
  const [useNewTheme, setUseNewTheme] = useState(false);

  const courses = [
    {
      id: 1,
      title: "JavaScript Basics",
      author: "Sarah Johnson",
      likes: 156,
      comments: 42,
      views: 2540
    },
    {
      id: 2,
      title: "React Fundamentals",
      author: "Michael Chen",
      likes: 231,
      comments: 78,
      views: 3620
    },
    {
      id: 3,
      title: "CSS Animations",
      author: "Emily Parker",
      likes: 98,
      comments: 25,
      views: 1785
    }
  ];

  return (
    <>
      <EnhancedNavbar />
      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <Button 
              onClick={() => setUseNewTheme(!useNewTheme)}
              className="mb-4 bg-primary-purple hover:bg-secondary-purple transition-colors duration-300"
            >
              {useNewTheme ? "Use Classic Theme" : "Use New Theme"}
            </Button>
            
            {useNewTheme ? (
              <ProfileTheme 
                name="George Johnson" 
                role={selectedGender ? `Gender: ${selectedGender}` : 'Learning Enthusiast'}
                customStyles={{
                  gradientFrom: "primary-purple",
                  gradientVia: "secondary-purple",
                  gradientTo: "tertiary-purple",
                  buttonColor: "primary-purple",
                  buttonHoverColor: "secondary-purple"
                }}
              />
            ) : (
              <div className="group before:hover:scale-95 before:hover:h-72 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-primary-purple via-secondary-purple to-tertiary-purple before:absolute before:top-0 w-80 h-72 relative bg-dark-purple flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-primary-purple/20 transition-all duration-300">
                <div className="w-28 h-28 bg-primary-purple mt-8 rounded-full border-4 border-dark-purple z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500 animate-float">
                  <Avatar className="w-full h-full" />
                </div>
                <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
                  <span className="text-2xl font-semibold text-white">George Johnson</span>
                  <p className="text-gray-300">{selectedGender ? `Gender: ${selectedGender}` : 'Learning Enthusiast'}</p>
                </div>
                <Button className="bg-primary-purple px-4 py-1 text-white rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-secondary-purple animate-breathe">
                  Follow
                </Button>
              </div>
            )}

            {/* Gender Selection */}
            <div className="mt-6">
              {!showGenderSelection ? (
                <Button 
                  onClick={() => setShowGenderSelection(true)} 
                  className="w-full bg-mint text-forest hover:bg-mint/90 border border-mint/30 animate-glow"
                >
                  Set Gender Preference
                </Button>
              ) : (
                <GenderSelection 
                  selectedGender={selectedGender} 
                  onChange={(gender) => setSelectedGender(gender)} 
                />
              )}
            </div>

            {/* Social Links */}
            {!showSocialLinks ? (
              <Button 
                onClick={() => setShowSocialLinks(true)}
                className="mt-4 w-full bg-dark-purple text-primary-purple border border-primary-purple hover:bg-primary-purple/10"
              >
                Add Social Links
              </Button>
            ) : (
              <Card className="mt-4 p-4 flex items-center justify-center gap-4 bg-dark-purple border-primary-purple/30 animate-slide-in">
                <a href="#" className="socialContainer containerOne hover:animate-pulse">
                  <svg className="socialSvg" viewBox="0 0 16 16"> 
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                  </svg>
                </a>
                
                <a href="#" className="socialContainer containerTwo hover:animate-pulse">
                  <svg className="socialSvg" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                  </svg>
                </a>
                
                <a href="#" className="socialContainer containerThree hover:animate-pulse">
                  <svg className="socialSvg" viewBox="0 0 448 512">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
                
                <a href="#" className="socialContainer containerFour hover:animate-pulse">
                  <svg className="socialSvg" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                  </svg>
                </a>
              </Card>
            )}

            {/* Rating Buttons */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Rate this profile</h3>
              <RatingButtons />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <Tabs defaultValue="courses" className="animate-fade-in">
              <TabsList className="w-full grid grid-cols-3 mb-6 bg-dark-purple/50 border border-primary-purple/30">
                <TabsTrigger value="courses" className="data-[state=active]:bg-primary-purple data-[state=active]:text-white">Courses</TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-primary-purple data-[state=active]:text-white">Skills</TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-primary-purple data-[state=active]:text-white">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="courses" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">My Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      id={course.id}
                      title={course.title}
                      author={course.author}
                      likes={course.likes}
                      comments={course.comments}
                      views={course.views}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="skills">
                <h2 className="text-2xl font-bold mb-4">My Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Card className="p-4 bg-dark-purple border-primary-purple/30 hover:border-primary-purple transition-all duration-300 animate-fade-in">
                    <h3 className="font-bold">JavaScript</h3>
                    <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-purple rounded-full animate-slide-in" 
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-dark-purple border-primary-purple/30 hover:border-primary-purple transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <h3 className="font-bold">React</h3>
                    <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-purple rounded-full animate-slide-in" 
                        style={{ width: '75%', animationDelay: '0.1s' }}
                      ></div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-dark-purple border-primary-purple/30 hover:border-primary-purple transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <h3 className="font-bold">CSS</h3>
                    <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-purple rounded-full animate-slide-in" 
                        style={{ width: '90%', animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="activity">
                <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <Card className="p-4 bg-dark-purple border-primary-purple/30 hover:border-primary-purple hover:translate-x-1 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-purple rounded-full animate-pulse"></div>
                      <span>Completed "Advanced React Patterns" course</span>
                      <span className="ml-auto text-sm text-gray-400">2 days ago</span>
                    </div>
                  </Card>
                  <Card className="p-4 bg-dark-purple border-primary-purple/30 hover:border-primary-purple hover:translate-x-1 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-purple rounded-full animate-pulse"></div>
                      <span>Posted a new tutorial on CSS animations</span>
                      <span className="ml-auto text-sm text-gray-400">1 week ago</span>
                    </div>
                  </Card>
                  <Card className="p-4 bg-dark-purple border-primary-purple/30 hover:border-primary-purple hover:translate-x-1 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-purple rounded-full animate-pulse"></div>
                      <span>Joined a new study group for TypeScript</span>
                      <span className="ml-auto text-sm text-gray-400">2 weeks ago</span>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
