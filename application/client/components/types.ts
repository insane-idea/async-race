export type BodyType = {
  [key: string]: string | number;
};

export type CarType = {
  name: string;
  color: string;
  id: number;
};

export type WinnerType = {
  id: number;
  wins: number;
  time: number;
};

export type GetCarsType = {
  items: CarType[];
  count: string | number;
};

export type GetWinnersType = {
  items: WinnerType[];
  count: string | number;
};

export type EngineType = {
  velocity: number;
  distance: number;
};
