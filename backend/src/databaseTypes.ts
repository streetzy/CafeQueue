export type Order = {
  id: number;
  description: string;
};

export type RestaurantLocation = {
  id: number;
  name: string;
  orders: Order[];
};

export type Database = {
  locations: RestaurantLocation[];
};
