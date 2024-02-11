export type Order = {
  id: number;
  description: string;
  isPrepared: boolean;
};

export type RestaurantLocation = {
  id: number;
  name: string;
  orders: Order[];
};

export type Database = {
  locations: RestaurantLocation[];
};
