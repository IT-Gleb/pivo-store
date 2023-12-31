//Сколько на странице продукта
export const MaxPerPage: number = 9;
export const MaxStars: number = 6;

//Для прогресс бара цен
export const MinPriceValue: number = 100;
export const MaxPriceValue: number = 800;

//For throttling
export const ThrottleStep = 50;

export interface IProgressParam {
  paramMin: number;
  paramMax: number;
  currentVal: number;
}

//-------------------------------------

//-------------Для маленького меню--------------
export const gamburgerMenu: string = "gamburgerMenu";
//--------------------------------------------------

export const stringRegXpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const stringRegXpPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d).[a-zA-Zd].{8,}$/gi;
//Минимум 8 знаков, минимум 1 заглавная буква, минимум 1 прописная, минимум 1 цифра

export const PortalM: string = "portal-m";

export interface ISerchData {
  SerchText: string;
  CurrentPage: number;
  serchedData: IPivoItem[];
}

export interface IChartComponentProp {
  startYear?: number;
  fromYear?: string;
  nameItem?: string;
}

interface ISliderItemProp {
  title: string;
  image: string;
  body: string;
  width?: number;
}

interface IMessageBoxProps {
  title: string;
  body: string;
  close: () => void;
}

type TWords = {
  Name: string;
  fSize: string;
};

interface IParamQuery {
  url: string;
  page: number;
  perPage: number;
}

//-----------------Интерфейс для пиво item-------
export interface IPivoResponse<T> {
  Items: T[];
}

export interface IPivoResponseItem {
  error: string;
  item: IPivoItem | null;
}

export interface IPivoItem {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: BoilVolume;
  boil_volume: BoilVolume;
  method: Method;
  ingredients: Ingredients;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
  _price?: number;
  _star?: number;
}

export interface BoilVolume {
  value: number;
  unit: string;
}

export interface Ingredients {
  malt: Malt[];
  hops: Hop[];
  yeast: string;
}

export interface Hop {
  name: string;
  amount: BoilVolume;
  add: string;
  attribute: string;
}

export interface Malt {
  name: string;
  amount: BoilVolume;
}

export interface Method {
  mash_temp: MashTemp[];
  fermentation: Fermentation;
  twist: null;
}

export interface Fermentation {
  temp: BoilVolume;
}

export interface MashTemp {
  temp: BoilVolume;
  duration: number;
}
export interface IPivoPricing {
  price: number;
  stars: number;
}

//---------End of --- Интерфейс для пиво item-------

export interface IWindowSize {
  width: number;
  height: number;
}

export type Props = {
  children: JSX.Element | React.ReactNode;
};

export interface IRightButtonProps {
  title: string;
  buttonClass: string;
  iconClass: string;
  iClass: string;
  hasName: boolean;
  isCount?: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface IFilterWindowProps {
  close: () => void;
}

export interface IFilterData {
  serchText: string;
  howSort: number;
  priceData: number;
  isFiltered: boolean;
  currentPage: number;
}

export interface IUser {
  isAuth: boolean;
  Name: string;
  email: string;
  passWord: string;
  id: string;
  eCartId: string;
  ordersId: string;
}

export type { ISliderItemProp, IMessageBoxProps, TWords, IParamQuery };
