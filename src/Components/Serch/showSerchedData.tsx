import { usePivoSelector } from "../../hooks/storeHooks";
import { IPivoItem, MaxPerPage } from "../../types";
import { Link } from "react-router-dom";
import SmallItemCard from "../PivoItem/SmallItemCard";
import { useEffect, useState } from "react";
import orderBy from "lodash/orderBy";

function ShowSerchedData() {
  const dataSerch: IPivoItem[] = usePivoSelector(
    (state) => state.serchData.serchedData
  );
  const [items, setItems] = useState<IPivoItem[]>(dataSerch);
  const [pagesCount, SetPagesCount] = useState<number>(
    Math.ceil(dataSerch.length / MaxPerPage)
  );
  const [Pages, setPages] = useState<number[]>([]);
  const [ActivePage, setActivePage] = useState<number>(1);

  const handlePagBtn = (paramPage: number) => {
    setActivePage(paramPage);
  };

  useEffect(() => {
    //Количество страниц
    if (dataSerch) {
      if (dataSerch.length > MaxPerPage) {
        SetPagesCount(Math.ceil(dataSerch.length / MaxPerPage));
      } else SetPagesCount(1);

      let tmpPages: number[] = [];
      for (let i: number = 0; i < pagesCount; i++) {
        tmpPages.push(i);
      }
      setPages(tmpPages);
    }
  }, [dataSerch, pagesCount]);

  useEffect(() => {
    if (dataSerch) {
      //Откуда начинать считывать
      let dataStart = ActivePage * MaxPerPage - MaxPerPage;
      if (dataStart < 2) dataStart = 0;
      let dataEnd = dataStart + MaxPerPage;
      if (dataEnd > dataSerch.length) dataEnd = dataSerch.length;
      let tmpItems = dataSerch.slice(dataStart, dataEnd);
      tmpItems = orderBy(tmpItems, ["_price"], ["desc"]);
      setItems(tmpItems);
    }
  }, [ActivePage, dataSerch]);

  return (
    <>
      <h4 className="title-article title is-size-4 mt-5">
        Найдено - {dataSerch.length}
      </h4>
      <div className="small-item-grid">
        {dataSerch &&
          items.length > 0 &&
          items.map((item: IPivoItem) => {
            return (
              <Link
                key={item.id}
                to={`items/${item.id}/price/${item._price}/stars/${item._star}`}
              >
                <SmallItemCard props={item} paramSel={2} />
              </Link>
            );
          })}
      </div>
      <h4 className="title-article title is-size-4 mt-5">
        Найдено - {dataSerch.length}
      </h4>
      {/* Пагинация */}
      <nav
        className="pagination mt-5"
        role="navigation"
        aria-label="pagination"
      >
        <ul className="pagination-list">
          {Pages &&
            items.length > 0 &&
            Pages.map((item) => {
              return (
                <li key={item}>
                  <button
                    className={
                      item + 1 === ActivePage
                        ? "button pagination-link is-meduim is-current has-background-primary has-text-light has-text-weight-semibold"
                        : "button pagination-link is-small"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      handlePagBtn(item + 1);
                    }}
                  >
                    {item + 1}
                  </button>
                </li>
              );
            })}
        </ul>
      </nav>
    </>
  );
}

export default ShowSerchedData;
