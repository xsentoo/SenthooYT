import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getWatchHistory, clearWatchHistory } from '../utils/storageUtils';
import VideoCard from '../components/VideoCard/VideoCard';
import { History, Trash2 } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const watchHistory = getWatchHistory();
  
  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your watch history?')) {
      clearWatchHistory();
      // Force a re-render
      navigate(0);
    }
  };
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Watch History</h1>
        
        {watchHistory.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="inline-flex items-center rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
          >
            <Trash2 size={16} className="mr-2" />
            Clear History
          </button>
        )}
      </div>
      
      {watchHistory.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center shadow-md">
          <History size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="mb-2 text-xl font-medium text-gray-900">No Watch History</h2>
          <p className="mb-4 text-gray-600">
            Videos you watch will appear here
          </p>
          <button
            onClick={() => navigate('/')}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Browse Videos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {watchHistory.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;