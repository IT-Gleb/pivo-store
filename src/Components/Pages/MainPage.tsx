import React, { useState, useEffect } from "react";
import {
  useLazyGetItemsByNameQuery,
  useLazyGetItemsQuery,
} from "../../store/punkApi/pivo.punk.api";
import {
  MaxPerPage,
  type IParamQuery,
  type IPivoItem,
  IFilterData,
} from "../../types";
import SmallItemCard from "../PivoItem/SmallItemCard";
import { InView } from "react-intersection-observer";
import RightMenu from "../Menu/RightMenu";
import RightButton from "../UI/Buttons/RightButtons";
import { Link, useNavigate } from "react-router-dom";
import useVideoHeight from "../../hooks/videoHeightHook";
import FilterWindow from "../UI/Filter/FilterWindow";
import orderBy from "lodash/orderBy";
import { usePivoDispatch, usePivoSelector } from "../../hooks/storeHooks";
import {
  updateCurrentPage,
  updateIsFiltered,
} from "../../store/slices/filterSlice";
import { addPortionItems } from "../../store/slices/pivo1Slice";
import FilteredRecords from "../UI/Filter/filteredRecords";
import SerchString from "../UI/serchString";
import useScreenWidth from "../../hooks/screenWidth";
import PivoSpinner from "../UI/Spinner/pivoSpinner";
import {
  updateSerchDataText,
  updateSerchedData,
  zeroData,
} from "../../store/slices/serchSlice";
import ShowSerchedData from "../Serch/showSerchedData";

function MainPage() {
  const [load, setLoad] = useState<boolean>(false);
  const [page, setPage] = useState<IParamQuery>({
    url: "beers",
    page: 0,
    perPage: MaxPerPage,
  });
  const [MainData, setMainData] = useState<IPivoItem[]>([]);
  const navigate = useNavigate();
  const { videoHeight } = useVideoHeight();
  const [showFiler, setShowFilter] = useState<boolean>(false);
  const FilterData = usePivoSelector((state) => state.filterD);
  const dispatch = usePivoDispatch();

  const [filterUp, setFilterUp] = useState<boolean>(FilterData.isFiltered);

  const filteredStoreData = usePivoSelector((state) => state.pivoItems.Items);
  const [FilteredData, setFilteredData] =
    useState<IPivoItem[]>(filteredStoreData);
  const { screenWidth } = useScreenWidth();
  const [isSerch, setIsSerch] = useState<boolean>(false);

  function toggleFilter() {
    setShowFilter(!showFiler);
  }

  function handleBtnClick2(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    window.scrollTo(0, videoHeight + 10);
    navigate("/second");
  }

  function handleMoveUp(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    window.scrollTo(0, videoHeight + 10);
  }

  function handleFilter(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setFilterUp(!filterUp);

    //отменить поиск если он был
    setIsSerch(false);
    dispatch(zeroData());
    //---------------------------

    let tmpData: IFilterData;
    tmpData = Object.assign({}, FilterData);
    tmpData.isFiltered = !filterUp;
    dispatch(updateIsFiltered(!filterUp));
    // обновить данные в сторе
    //console.log("from - function", tmpData.isFiltered);
    //скрыть окно фильтра
    setShowFilter(false);
    //Применить фильтр
    if (tmpData.isFiltered) {
      let localFilteredData: IPivoItem[] = [];

      //Применить фильтацию по цене
      let fPrice = tmpData.priceData;
      // console.log(fPrice, localFilteredData.length);
      localFilteredData = MainData.filter((item: IPivoItem) => {
        return item._price! >= fPrice;
      });
      // console.log(localFilteredData);
      //Сортировка
      let tmpId: string = "_star";
      let tmpDA: boolean | "asc" | "desc" = "asc";
      switch (tmpData.howSort) {
        case 1:
          tmpId = "_price";
          tmpDA = "desc";
          break;
        case 2:
          tmpId = "_star";
          tmpDA = "desc";
          break;
        case 3:
          tmpId = "name";
          // tmpDA = "asc";
          break;
        case 4:
          tmpId = "abv";
          tmpDA = "desc";
          break;
        case 5:
          tmpId = "first_brewed";
          tmpDA = "desc";
          break;
        default:
          tmpId = "";
          // tmpDA = "asc";
          break;
      }
      //Отсортировать по цене
      localFilteredData = orderBy(localFilteredData, [tmpId], [tmpDA]);
      //Отфильтровать по строке поиска
      if (FilterData.serchText) {
        if (FilterData.serchText.trim().length > 2) {
          localFilteredData = localFilteredData.filter((item: IPivoItem) => {
            if (
              item.name
                .toLowerCase()
                .includes(FilterData.serchText.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(FilterData.serchText.toLowerCase())
            ) {
              return item;
            }
          });
        }
      }
      //Добавить в хранилище
      dispatch(addPortionItems(localFilteredData));
      //Установить отфильтрованные данные
      setFilteredData(localFilteredData);
      //Установить текущую страницу в 1;
      dispatch(updateCurrentPage(1));
    }
  }

  // const { isError, isLoading, isSuccess, data } = useGetAllItemsQuery(param);
  const [
    fetchItems,
    {
      isLoading: areLoading,
      data: Items,
      isSuccess: areSuccess,
      isError: areError,
    },
  ] = useLazyGetItemsQuery({
    refetchOnReconnect: true, //При потере сети и восстановлении сделать запрос данных
    pollingInterval: 35000, //Через какое время автоматически обновить данные
  });

  // console.log(data);
  //Запрос на сервер
  const handleLoad = async (paramInView: boolean = false) => {
    if (paramInView) {
      // console.log("Начать загрузку..");
      try {
        setLoad(true);
        let tempPage = Object.assign({}, page);
        tempPage.page++;
        setPage(tempPage);
        // console.log("Номер страницы: ", tempPage.page);
        await fetchItems(tempPage);
      } finally {
        setLoad(false);
        // console.log("Not see...");
      }
    }
  };

  //Обработка и сортировка полученных данных
  useEffect(() => {
    if (Items) {
      if (Items!.length > 0) {
        let tempData: IPivoItem[] = Array.from(MainData);
        //Добавить только если нет совпадений по id
        Items.forEach((item: IPivoItem) => {
          if (
            !tempData.find((el: IPivoItem) => {
              return el.id === item.id;
            })
          ) {
            tempData.push(item);
          }
        });
        // tempData = sortBy(tempData, [
        //   function (item) {
        //     return item._star;
        //   },
        // ]);
        // tempData = orderBy(tempData, ["_star", "_price"], ["asc", "desc"]);

        // tempData = orderBy(tempData, ["_star", "name"], ["asc", "asc"]);

        // console.log(tempData);
        setMainData(tempData);
      }
    }
  }, [Items]);

  const [
    fetchByName,
    { data: serchData, isLoading: isSerchLoading, isSuccess: isSerchSuccess },
  ] = useLazyGetItemsByNameQuery();
  //Поиск наименования по базе сервера
  const getSerchByName = async (paramSerch: string) => {
    paramSerch.length > 0 ? setIsSerch(true) : setIsSerch(false);
    if (paramSerch.length > 2) {
      //Отменить фмльтрацию
      if (filterUp) setFilterUp(false);
      //-------------------
      dispatch(updateSerchDataText(paramSerch));
      await fetchByName(paramSerch);
    } else dispatch(zeroData());
  };

  useEffect(() => {
    if (isSerchSuccess && serchData) {
      if (serchData.length > 0) {
        setIsSerch(true);
        dispatch(updateSerchedData(serchData));
        //console.log(serchData);
      }
    }
    if (serchData && serchData.length < 1) dispatch(zeroData());
  }, [isSerchSuccess, serchData]);

  return (
    <>
      {/* Меню с иконками с права */}
      <RightMenu>
        <RightButton
          title="Категории"
          buttonClass="button p-4 is-info"
          iconClass="icon is-size-4"
          iClass="fas fa-wine-bottle"
          hasName={false}
        />
        <RightButton
          title={"Избранное"}
          buttonClass={"button p-4 is-link"}
          iconClass="icon is-size-4"
          iClass="fas fa-heart"
          hasName={false}
          onClick={handleBtnClick2}
        />
        <RightButton
          title="Корзина"
          buttonClass="button p-4 is-warning"
          iconClass="icon is-size-4"
          iClass="fas fa-shopping-cart"
          hasName={false}
          // onClick={handleButtonClick}
        />
        <RightButton
          title="Фильтр"
          buttonClass="button p-4 is-primary"
          iconClass="icon is-size-4"
          iClass="fas fa-filter"
          hasName={false}
          onClick={handleFilter}
        />
        <RightButton
          title="Переход на верх"
          buttonClass="button p-4 is-link"
          iconClass="icon is-size-4"
          iClass="fas fa-arrow-up"
          hasName={false}
          onClick={handleMoveUp}
        />
      </RightMenu>
      {/* end of Меню с иконками с права */}
      {/* Фильтр окно */}
      <section className="section">
        <div className={screenWidth > 577 ? "block is-pulled-right" : "block"}>
          <SerchString doSerch={getSerchByName} />
        </div>
        <div className="block buttons are-small mt-4 mb-3">
          <button className="button is-rounded" onClick={toggleFilter}>
            <div className="icon mr-1">
              <i className="fas fa-sort-amount-down"></i>
            </div>
            / Фильтрация / Сортировка /
          </button>
          {showFiler && (
            <button
              className={
                filterUp
                  ? "button is-rounded is-warning ml-3"
                  : "button is-rounded ml-3"
              }
              onClick={handleFilter}
            >
              <span className="icon mr-1">
                <i className="fas fa-filter"></i>
              </span>
              {filterUp ? "Отменить фильтр" : "Применить фильтр"}
            </button>
          )}
        </div>
      </section>

      {showFiler && (
        <FilterWindow
          toggleFilter={() => setFilterUp(false)}
          close={() => setShowFilter(false)}
        />
      )}
      {/* При поиске */}
      {isSerchLoading && <PivoSpinner text={"Ищу пиво..."} />}

      {/* End of Фильтр окно */}
      <InView
        triggerOnce={true}
        onChange={(inView, entrie) => handleLoad(inView)}
      >
        {load && <div className="loadLine"></div>}
      </InView>
      {areLoading && <PivoSpinner text="Загрузка данных..." />}
      {areError && (
        <p className="has-text-danger has-text-centered mt-5 mb-5">
          Ошибка получения данных...
        </p>
      )}
      {/* //Вывод данных без фильтрации */}
      {areSuccess && !filterUp && !isSerch && (
        <section className="section mb-4">
          <h1 className="title is-size-4 mt-2 mb-2 title-article">
            Товар в наличии -{" "}
            <span className="subtitle is-size-6 ">
              {MainData?.length} позиций
            </span>
          </h1>
          <div className="small-item-grid">
            {MainData?.map((item: IPivoItem) => {
              return (
                <Link
                  key={item.id}
                  to={`items/${item.id}/price/${item._price}/stars/${item._star}`}
                >
                  <SmallItemCard props={item} paramSel={0} />
                </Link>
              );
            })}
          </div>
          <InView onChange={(inView, entrie) => handleLoad(inView)}>
            {
              <div className="loadLine has-text-light has-text-centered">
                Нет данных...
              </div>
            }
          </InView>
        </section>
      )}
      {filterUp && !isSerch && <FilteredRecords perPage={MaxPerPage} />}
      {!filterUp && isSerch && (
        <section className="section">
          <h4 className="title is-size-4">Найдено {serchData?.length}</h4>
          <ShowSerchedData />
        </section>
      )}
    </>
  );
}

export default React.memo(MainPage);
