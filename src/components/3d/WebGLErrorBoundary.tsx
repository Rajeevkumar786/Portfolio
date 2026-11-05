import React, { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('WebGL Rendering Error intercepted by WebGLErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Ambient CSS Fallback Background */}
            <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/10 blur-[120px]" />
            <div className="absolute top-[40%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 blur-[120px]" />
            <div className="absolute -bottom-[10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-cyan-600/10 blur-[120px]" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>
        )
      );
    }

    return this.props.children;
  }
}
