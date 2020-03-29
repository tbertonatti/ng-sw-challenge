export interface FilterOption<T> {
  value: T;
  count: number;
}

export interface Result<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}
