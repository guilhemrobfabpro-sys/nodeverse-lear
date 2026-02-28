import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen gradient-bg flex flex-col items-center justify-center px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-5 border border-destructive/20">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-xl font-heading font-bold text-foreground mb-2">Something went wrong</h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            An unexpected error occurred. Your progress is saved.
          </p>
          {this.state.error && (
            <pre className="text-[10px] text-muted-foreground bg-muted/30 rounded-xl p-3 mb-6 max-w-sm overflow-x-auto text-left">
              {this.state.error.message}
            </pre>
          )}
          <div className="flex gap-3">
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
            <button
              onClick={() => { window.location.href = '/dashboard'; }}
              className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
            >
              Go home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
