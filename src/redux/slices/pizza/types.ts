export type SearchPizzaParams = {
  search: string;
  category: string;
  sortBy: string;
  currentPage: string;
  order: string;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
