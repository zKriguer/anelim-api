export type UserProfile = {
  email: string;
  password: string;
  name: string;
};

export type mealItem = {
  mealName: string;
  isHealthy: boolean;
  date: string;
};

export type orders = [
  {
    userId: string;
    id: string;
    price: number;
    title: string;
    delivered: boolean;
  },
];
