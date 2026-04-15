import React, { Component } from 'react';
interface IErrorBoundaryProps {
}
interface IErrorBoundaryState {
    errorText?: string | null;
    originalError?: Error | null;
}
declare class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps);
    componentDidCatch(error: Error, errorInfo?: React.ErrorInfo): Promise<void>;
    continueCrash(): void;
    render(): React.ReactNode;
}
export default ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.d.ts.map