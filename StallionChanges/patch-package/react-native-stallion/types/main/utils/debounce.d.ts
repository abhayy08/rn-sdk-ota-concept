declare function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void;
export default debounce;
//# sourceMappingURL=debounce.d.ts.map