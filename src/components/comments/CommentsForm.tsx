
import React, { useState } from 'react';
import { Heart, Send, Bold, Italic, List, Link } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  timestamp: string;
  content: string;
  likes: number;
}

interface CommentsFormProps {
  comments?: Comment[];
}

const CommentsForm: React.FC<CommentsFormProps> = ({ 
  comments = [] 
}) => {
  const [replyText, setReplyText] = useState('');

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      // Handle submit logic here
      console.log("Submitting reply:", replyText);
      setReplyText('');
    }
  };

  return (
    <div className="card">
      <span className="title">Comments</span>
      
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="comments" key={comment.id}>
            <div className="comment-react">
              <button>
                <Heart size={16} color="#707277" strokeWidth={2} />
              </button>
              <hr />
              <span>{comment.likes}</span>
            </div>
            <div className="comment-container">
              <div className="user">
                <div className="user-pic">
                  <svg fill="none" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinejoin="round" fill="#707277" strokeLinecap="round" strokeWidth="2" stroke="#707277" d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"></path>
                    <path strokeWidth="2" fill="#707277" stroke="#707277" d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"></path>
                  </svg>
                </div>
                <div className="user-info">
                  <span>{comment.author}</span>
                  <p>{comment.timestamp}</p>
                </div>
              </div>
              <p className="comment-content">{comment.content}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="comments">
          <div className="comment-react">
            <button>
              <Heart size={16} color="#707277" strokeWidth={2} />
            </button>
            <hr />
            <span>14</span>
          </div>
          <div className="comment-container">
            <div className="user">
              <div className="user-pic">
                <svg fill="none" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinejoin="round" fill="#707277" strokeLinecap="round" strokeWidth="2" stroke="#707277" d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"></path>
                  <path strokeWidth="2" fill="#707277" stroke="#707277" d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"></path>
                </svg>
              </div>
              <div className="user-info">
                <span>Yassine Zanina</span>
                <p>Wednesday, March 13th at 2:45pm</p>
              </div>
            </div>
            <p className="comment-content">
              I've been using this product for a few days now and I'm really impressed! The interface is intuitive and easy to
              use, and the features are exactly what I need to streamline my workflow.
            </p>
          </div>
        </div>
      )}

      <div className="text-box">
        <div className="box-container">
          <textarea 
            placeholder="Reply" 
            value={replyText}
            onChange={handleReplyChange}
          />
          <div>
            <div className="formatting">
              <button type="button">
                <Bold size={16} color="#707277" />
              </button>
              <button type="button">
                <Italic size={16} color="#707277" />
              </button>
              <button type="button">
                <List size={16} color="#707277" />
              </button>
              <button type="button">
                <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#707277" d="M17.5 7.66667C17.5 5.08934 15.0376 3 12 3C8.96243 3 6.5 5.08934 6.5 7.66667C6.5 8.15279 6.55336 8.59783 6.6668 9M6 16.3333C6 18.9107 8.68629 21 12 21C15.3137 21 18 19.6667 18 16.3333C18 13.9404 16.9693 12.5782 14.9079 12"></path>
                  <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#707277" d="M4 12H20"></path>
                </svg>
              </button>
              <button type="button">
                <Link size={16} color="#707277" />
              </button>
              <button 
                type="submit" 
                className="send" 
                title="Send"
                onClick={handleSubmitReply}
              >
                <Send size={16} color="#ffffff" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsForm;
