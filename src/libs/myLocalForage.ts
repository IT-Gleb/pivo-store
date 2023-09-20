import localforage from "localforage";

export const nameDb: string = "PivoStore";

export const PivoDb = localforage;

PivoDb.config({
  driver: [PivoDb.INDEXEDDB, PivoDb.WEBSQL],
  name: nameDb,
  version: 1.0,
});
