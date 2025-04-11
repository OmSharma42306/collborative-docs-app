import React from 'react';
import { MessageCircle, Users } from 'lucide-react';

interface EditorContainerProps {
  title: string;
  children: React.ReactNode;
  onConnect: () => void;
  isConnected?: boolean;
}

const EditorContainer: React.FC<EditorContainerProps> = ({
  title,
  children,
  onConnect,
  isConnected = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        <button
          onClick={onConnect}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            isConnected
              ? 'bg-green-100 text-green-700'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <Users className="w-4 h-4" />
          {isConnected ? 'Connected' : 'Connect'}
        </button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default EditorContainer;