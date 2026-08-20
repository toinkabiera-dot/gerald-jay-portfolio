import { ReactNode } from 'react';

export function NeuCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`neu-panel rounded-3xl p-8 ${className}`}>
      {children}
    </div>
  );
}

export function NeuButton({ 
  children, 
  primary = false, 
  className = '', 
  onClick,
  type = 'button'
}: { 
  children: ReactNode; 
  primary?: boolean; 
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`px-8 py-4 rounded-2xl font-medium text-sm md:text-base tracking-wide flex items-center justify-center gap-2 ${
        primary ? 'neu-button-primary text-white' : 'neu-button text-foreground'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function NeuInput({ 
  placeholder, 
  type = 'text', 
  className = '',
  textarea = false,
  rows = 4
}: { 
  placeholder: string; 
  type?: string; 
  className?: string;
  textarea?: boolean;
  rows?: number;
}) {
  const baseClasses = `neu-input w-full rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground ${className}`;
  
  if (textarea) {
    return (
      <textarea 
        placeholder={placeholder} 
        rows={rows}
        className={`${baseClasses} resize-none`}
      />
    );
  }
  
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      className={baseClasses}
    />
  );
}

export function NeuCodeBlock({ code, title }: { code: string; title: string }) {
  return (
    <div className="rounded-2xl overflow-hidden neu-flat border border-white/5">
      <div className="bg-[#121220] px-4 py-3 flex items-center justify-between border-b border-white/5">
        <span className="text-xs font-mono text-muted-foreground">{title}</span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
      </div>
      <div className="p-4 overflow-x-auto neu-inset bg-opacity-50">
        <pre className="font-mono text-sm text-gray-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
