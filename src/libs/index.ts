import {
  MinPriceValue,
  MaxPriceValue,
  type IUser,
  stringRegXpEmail,
  IPivoItem,
} from "../types";
import { validate as UUID5validate } from "uuid";
import { nameDb, PivoDb } from "./myLocalForage";

const TOPMENUVIDEO: string = "TopMenuVideo";

function checkerAuth(pUser: IUser): boolean {
  let res: boolean = false;
  try {
    res =
      // pUser.isAuth && pUser.Name.trim().length > 0 && pUser.id.trim().length > 0;
      pUser.Name.trim().length > 0 &&
      UUID5validate(pUser.id) &&
      stringRegXpEmail.test(pUser.email);
  } catch {
    res = false;
  } finally {
    return res;
  }
}

function randomFrom(pMin: number = 0, pMax: number = 100) {
  // find diff
  // let difference = Math.abs(pMax - pMin);
  let difference = pMax - pMin;
  // generate random number
  let rand = Math.random();
  // multiply with difference
  rand = Math.floor(rand * difference);
  // add with min value
  rand = rand + pMin;

  return rand;
}

function checkMounth(paramStr: string, paramDel: string = "/") {
  // console.log(paramStr);
  let res: string;
  if (!paramStr) return "no Data";
  let mStr: string = paramStr.split(paramDel)[0];
  if (mStr) {
    res = mStr.trim();
  } else return "no Mounth";

  if (res) {
    switch (res) {
      case "01":
        res = "январь";
        break;
      case "02":
        res = "февраль";
        break;
      case "03":
        res = "март";
        break;
      case "04":
        res = "апрель";
        break;
      case "05":
        res = "май";
        break;
      case "06":
        res = "июнь";
        break;
      case "07":
        res = "июль";
        break;
      case "08":
        res = "август";
        break;
      case "09":
        res = "сентябрь";
        break;
      case "10":
        res = "октябрь";
        break;
      case "11":
        res = "ноябрь";
        break;
      case "12":
        res = "декабрь";
        break;
      default:
        res = "январь";
        break;
    }
  }
  return res;
}

function checkYear(paramStr: string, paramDel: string = "/") {
  let res: string = "";
  if (!paramStr) return "no Year";
  let yStr = paramStr.split(paramDel)[1];
  if (yStr) res = yStr.trim();
  else res = "no Year";

  return res;
}

function getPrice(paramStar: number = 2): number {
  // tmpStar = randomFrom(1, 6);
  let res: number;
  res =
    paramStar < 4
      ? randomFrom(MinPriceValue, 300)
      : randomFrom(350, MaxPriceValue);
  return res;
}

const checkInFavorites = (pId: number, paramArray: IPivoItem[]) => {
  let res = false;
  if (!paramArray || paramArray.length < 1) return res;
  if (
    paramArray.find((item: IPivoItem) => {
      return item.id === pId;
    })
  ) {
    res = true;
  }
  return res;
};

export {
  randomFrom,
  TOPMENUVIDEO,
  checkMounth,
  checkYear,
  getPrice,
  checkerAuth,
  nameDb,
  PivoDb,
  checkInFavorites,
};
