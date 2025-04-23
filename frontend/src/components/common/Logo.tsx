import { Code2 } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ size = 'medium' }: LogoProps) {
  const sizes = {
    small: { icon: 'h-5 w-5', text: 'text-lg' },
    medium: { icon: 'h-7 w-7', text: 'text-xl' },
    large: { icon: 'h-8 w-8', text: 'text-2xl' },
  };

  return (
    <div className="flex items-center space-x-2">
      <Code2 className={`${sizes[size].icon} text-blue-400`} />
      <span className={`${sizes[size].text} font-bold text-white`}>SyncSpace</span>
    </div>
  );
}