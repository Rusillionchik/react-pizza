declare module "lodash.debounce" {
  function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void;
  export default debounce;
}
