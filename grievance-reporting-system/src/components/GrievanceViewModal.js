import React, { useState, useEffect } from 'react';
import { 
  getGrievanceImageUrl, 
  getComments, 
  saveComment 
} from "../services/ApiService.js";

// A small helper component to make the read-only fields look consistent
function ReadOnlyField({ label, value }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500">{label}</label>
      <p className="mt-1 text-base text-gray-900">{value || '-'}</p>
    </div>
  );
}

// --- 1. UPDATED COMMENT COMPONENT ---
// It now accepts `firstName` as a prop
function Comment({ authorRole, text, timestamp, firstName }) {
  const isAdmin = authorRole === "Admin";
  const formattedTimestamp = new Date(timestamp).toLocaleString();

  // Use firstName if the author is not an Admin
  const authorName = isAdmin ? "Admin (You)" : firstName;

  return (
    <div className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${
          isAdmin ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'
      }`}>
        <p className="font-semibold text-sm">{authorName}</p>
        <p className="text-base whitespace-pre-wrap">{text}</p>
        <p className="text-xs opacity-75 mt-1 text-right">{formattedTimestamp}</p>
      </div>
    </div>
  );
}

export default function GrievanceViewModal({ isOpen, onClose, ticket }) {
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (isOpen && ticket) {
      const fetchComments = async () => {
        setIsLoadingComments(true);
        setCommentError(null);
        try {
          const data = await getComments(ticket.id);
          setComments(data);
        } catch (err) {
          setCommentError(err.message);
        } finally {
          setIsLoadingComments(false);
        }
      };
      
      fetchComments();
    } else {
      setComments([]);
      setNewComment("");
      setCommentError(null);
    }
  }, [isOpen, ticket]);

  if (!isOpen || !ticket) return null;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      text: newComment,
      authorRole: "Admin"
    };

    try {
      const savedComment = await saveComment(ticket.id, commentData);
      setComments(prevComments => [...prevComments, savedComment]);
      setNewComment("");
    } catch (error) {
      alert("Failed to save comment. Please try again.");
      console.error(error);
    }
  };

  const imageUrl = getGrievanceImageUrl(ticket.fileName);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl m-8 bg-white rounded-xl shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Grievance Details - Ticket #{ticket.id}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto" style={{maxHeight: '75vh'}}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Requester Info</h3>
              <ReadOnlyField label="First Name" value={ticket.firstName} />
              <ReadOnlyField label="Last Name" value={ticket.lastName} />
              <ReadOnlyField label="Email" value={ticket.email} />
              <ReadOnlyField label="Phone" value={ticket.phone} />
            </div>
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Grievance Info</h3>
              <ReadOnlyField label="Category" value={ticket.category} />
              <ReadOnlyField label="Location" value={ticket.locationInput} />
              <ReadOnlyField label="Current Status" value={ticket.status || "Pending"} />
            </div>
          </div>

          <div className="space-y-4 p-4 bg-gray-50 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Description</h3>
            <p className="text-base text-gray-900 whitespace-pre-wrap">
              {ticket.description || "No description provided."}
            </p>
          </div>

          {imageUrl && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Attached Image</h3>
              <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                <img 
                  src={imageUrl} 
                  alt="Grievance attachment" 
                  className="max-w-full h-auto rounded-md shadow-md"
                />
              </a>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Conversation History</h3>
            
            <div className="space-y-4 max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-lg">
              {isLoadingComments && <p className="text-gray-500">Loading comments...</p>}
              {commentError && <p className="text-red-500">Error: {commentError}</p>}
              {!isLoadingComments && !commentError && comments.length === 0 && (
                <p className="text-gray-500 italic">No comments yet.</p>
              )}

              {/* --- 2. UPDATED MAP --- */}
              {/* Pass the ticket's firstName to the component */}
              {comments.map((comment) => (
                <Comment 
                  key={comment.id} 
                  authorRole={comment.authorRole} 
                  text={comment.text} 
                  timestamp={comment.timestamp}
                  firstName={ticket.firstName} 
                />
              ))}
            </div>

            <form onSubmit={handleCommentSubmit}>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Add a new comment
              </label>
              <textarea
                id="comment"
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-3 py-2 text-base border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Type your internal note or comment here..."
              ></textarea>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="mt-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 disabled:bg-gray-300"
              >
                Submit Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}