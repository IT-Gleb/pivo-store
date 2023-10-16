import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MaxStars, type IParamQuery, type IPivoItem } from "../../types";
import { randomFrom, getPrice } from "../../libs";

const B_URL: string = "https://api.punkapi.com/v2/";

export const pivoApi = createApi({
  reducerPath: "pivoApi",
  baseQuery: retry(fetchBaseQuery({ baseUrl: B_URL }), { maxRetries: 5 }), //Повторяет запрос в случае ошибки каждый раз с увел. интервалом
  refetchOnReconnect: true,
  tagTypes: ["Items", "Item"],
  endpoints: (builder) => ({
    getAllItems: builder.query<IPivoItem[], IParamQuery>({
      query: (p: IParamQuery) => ({
        url: `${p.url}`,
        params: { page: p.page, per_page: p.perPage },
      }),
      // transformResponse: (response: IPivoResponse<IPivoItem>) => response.Items,
    }),
    getItems: builder.query<IPivoItem[], IParamQuery>({
      query: (p: IParamQuery) => ({
        url: `${p.url}`,
        params: {
          page: p.page,
          per_page: p.perPage,
        },
        Headers: { mode: "no-cors" },
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Items" as const, id })),
              "Items",
            ]
          : ["Items"],
      transformResponse: (response: IPivoItem[]) => {
        //Установить звезды и цену
        let tmpStar: number = 2;

        function getStar(): number {
          const res: number = randomFrom(1, 6);
          tmpStar = res;
          return res;
        }
        const Items: IPivoItem[] = response.map((item: IPivoItem) => ({
          ...item,
          _star: getStar(),
          _price: getPrice(tmpStar),
        }));
        return Items;
      },
    }),
    getItem: builder.query<IPivoItem, string>({
      query: (param: string) => ({
        url: `beers/${param}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Item" }],

      transformResponse: (Response: IPivoItem) => {
        const tmpD: any = Object.assign({}, Response);
        let Itm: IPivoItem = { ...tmpD["0"], _price: 10, _star: 3 };
        // Itm["_price"] = 10; //Добавляем _price
        // Itm["_star"] = 3; //Добавляем _star
        return Itm;
      },
    }),
    getItemsByName: builder.query<IPivoItem[], string>({
      query: (param: string) => ({
        url: `beers?beer_name=${param.replaceAll(" ", "_")}`,
      }),
      providesTags: ["Items"],

      transformResponse: (response: IPivoItem[]) => {
        //Установить звезды и цену
        let tmpStar: number = 2;

        function getStar(): number {
          const res: number = randomFrom(1, MaxStars);
          tmpStar = res;
          return res;
        }
        const Items: IPivoItem[] = response.map((item: IPivoItem) => ({
          ...item,
          _star: getStar(),
          _price: getPrice(tmpStar),
        }));
        return Items;
      },
    }),
    getRandomItems: builder.query<IPivoItem[], void>({
      async queryFn(_, _baseQueryApi, _extraOptions, fetchWidthBQ) {
        let randomResult: any = [];
        let resultError;
        const randomQueryes = [
          B_URL + "beers/random",
          B_URL + "beers/random",
          B_URL + "beers/random",
          B_URL + "beers/random",
          B_URL + "beers/random",
          B_URL + "beers/random",
        ];

        let randomItems: any = randomQueryes.map((item) => fetchWidthBQ(item));
        await Promise.allSettled(randomItems)
          .then((results) => {
            results.forEach((item) => {
              // console.log(item);
              if (item.status === "fulfilled") {
                //console.log(item.value.data[0]);
                let tmpItem: IPivoItem = item.value.data[0];
                tmpItem._price = randomFrom(100, 300);
                tmpItem._star = randomFrom(1, 4);
                randomResult.push(tmpItem);
              }
            });
          })
          .catch((err) => {
            console.log(err);
            resultError = err;
          });

        // console.log(randomResult);
        return randomResult ? { data: randomResult } : { error: resultError };
      },
    }),
  }),
});

export const {
  useLazyGetItemsQuery,
  useGetItemQuery,
  useLazyGetItemsByNameQuery,
  useGetRandomItemsQuery,
} = pivoApi;
