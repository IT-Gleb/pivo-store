//Вывести карточки отфильтрованных значений с пагинацией

import { useCallback, useEffect, useState } from "react";
import { IPivoItem } from "../../../types";
import SmallItemCard from "../../PivoItem/SmallItemCard";
import { usePivoDispatch, usePivoSelector } from "../../../hooks/storeHooks";
import { Link } from "react-router-dom";
import { updateCurrentPage } from "../../../store/slices/filterSlice";

export interface IFilteredRecordsProps {
  perPage: number;
}

function FilteredRecords(Props: IFilteredRecordsProps) {
  const [perPage, setPerPage] = useState<number>(Props.perPage || 1);
  const [PagCount, setPagCount] = useState<number>(1);
  const [pagBtns, setPagBtns] = useState<number[]>([]);
  const fItems = usePivoSelector((state) => state.pivoItems.Items);
  const dispatch = usePivoDispatch();
  const [ItemsRec, setItemsRec] = useState<IPivoItem[]>([]);
  const CurrPage = usePivoSelector((state) => state.filterD.currentPage);
  const [ActivePage, setActivePage] = useState<number>(CurrPage);

  const handlePage = useCallback(
    (paramPage: number) => {
      // console.log(paramPage);
      setActivePage(paramPage);
      dispatch(updateCurrentPage(paramPage));
    },
    [ActivePage]
  );

  useEffect(() => {
    if (Props.perPage) {
      setPerPage(Props.perPage);
    }
    let tmpPageCount: number = Math.ceil(fItems.length / perPage);
    setPagCount(tmpPageCount);

    let tmpBtns: number[] = [];
    for (let i: number = 0; i < tmpPageCount; i++) {
      tmpBtns.push(i + 1);
    }

    setPagBtns(tmpBtns);
  }, [Props]);

  useEffect(() => {
    let maxArrayLen = fItems.length;
    let tmpBegin: number = ActivePage * perPage - perPage;
    if (tmpBegin < 2) tmpBegin = 0;
    let maxLength: number = tmpBegin + perPage;
    if (maxLength > maxArrayLen) maxLength = maxArrayLen;
    let tmpRec: IPivoItem[] = [];

    // console.log(tmpBegin, maxLength);
    for (let i: number = tmpBegin; i < maxLength; i++) {
      tmpRec.push(fItems[i]);
    }

    setItemsRec(tmpRec);
  }, [ActivePage]);

  return (
    <>
      <section className="section pb-0">
        <h4 className="title is-size-4 mt-2 mb-2 title-article">
          Отфильтровано -
          <span className="subtitle is-size-6 ">{fItems.length} позиций</span>
        </h4>
      </section>
      <section className="section">
        <div className="small-item-grid">
          {ItemsRec &&
            ItemsRec.length > 0 &&
            ItemsRec.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={`items/${item.id}`}
                  state={{ price: item._price, stars: item._star }}
                >
                  <SmallItemCard props={item} paramSel={1} />
                </Link>
              );
            })}
        </div>
      </section>
      <section className="section mt-0 mb-0 py-0">
        <h4 className="title is-size-4 mt-2 mb-2 title-article">
          Отфильтровано -
          <span className="subtitle is-size-6 ">{fItems.length} позиций</span>
        </h4>
      </section>
      <section className="section">
        {/* Пагинация */}
        <nav
          className="pagination is-small"
          role="navigation"
          aria-label="pagination"
        >
          <ul className="pagination-list">
            {PagCount > 0 &&
              pagBtns.map((btn) => {
                return (
                  <li key={btn}>
                    <button
                      className={
                        btn === ActivePage
                          ? "pagination-link is-current is-clickable has-background-primary is-size-6 has-text-light has-text-weight-semibold"
                          : "pagination-link is-clickable"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        handlePage(btn);
                      }}
                    >
                      {btn}
                    </button>
                  </li>
                );
              })}
          </ul>
        </nav>
      </section>
    </>
  );
}

export default FilteredRecords;
