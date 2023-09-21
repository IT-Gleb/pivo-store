import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePivoDispatch, usePivoSelector } from "../../hooks/storeHooks";
import { IPivoItem, MaxPerPage } from "../../types";
import SmallItemCard from "../PivoItem/SmallItemCard";
import UserIsLogin from "../userIsLogin";
import { setCurrentPage } from "../../store/slices/favorites";

function FavoritesPage() {
  const favItems = usePivoSelector((state) => state.favorites.items);
  const navigate = useNavigate();
  const dispatch = usePivoDispatch();
  const currPage = usePivoSelector((state) => state.favorites.currentPage);
  const [activePage, setActivePage] = useState<number>(currPage);
  const [pageCount, setPageCount] = useState<number>(1);
  const [pageItems, setPageItems] = useState<IPivoItem[]>([]);
  const [pages, setPages] = useState<number[]>([]);

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  const handlePagClick = (pId: number) => {
    setActivePage(pId);
    dispatch(setCurrentPage(pId));
  };

  useEffect(() => {
    if (favItems) {
      let tmpPageCount = Math.ceil(favItems.length / MaxPerPage);
      setPageCount(tmpPageCount);
      let tmpPages: number[] = [];
      for (let i: number = 0; i < tmpPageCount; i++) {
        tmpPages.push(i + 1);
      }
      setPages(tmpPages);
      if (tmpPageCount === 1) {
        setActivePage(tmpPageCount);
        dispatch(setCurrentPage(tmpPageCount));
      }
    }
  }, [favItems, dispatch]);

  useEffect(() => {
    if (favItems && favItems.length > 0) {
      let offset = activePage * MaxPerPage - MaxPerPage;
      let maxItem = offset + MaxPerPage;
      if (maxItem > favItems.length) {
        maxItem = favItems.length;
      }
      let tmpPageItems: IPivoItem[] = favItems.slice(offset, maxItem);
      setPageItems(tmpPageItems);
    }
  }, [activePage, favItems]);

  return (
    <section className="section">
      <UserIsLogin />
      <div className="title is-size-5 title-article has-text-centered">
        Вы выбрали{" "}
        <span className="title is-size-6">{favItems.length} позиций</span>
      </div>
      <div className="small-item-grid">
        {favItems &&
          pageCount > 0 &&
          pageItems.length > 0 &&
          pageItems.map((item: IPivoItem) => {
            return (
              <Link
                key={item.id}
                to={`/items/${item.id}`}
                state={{ price: item._price, stars: item._star }}
              >
                <SmallItemCard props={item} paramSel={2} />
              </Link>
            );
          })}
      </div>
      {pageCount > 0 && (
        <nav
          className="pagination my-6 is-small"
          role="navigation"
          aria-label="pagination"
        >
          <ul className="pagination-list">
            {pages.map((item) => {
              return (
                <li
                  key={item}
                  className={
                    item === activePage
                      ? "pagination-link is-clickable is-size-6 is-current has-background-primary has-text-light has-text-weight-semibold"
                      : "pagination-link is-clickable"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    handlePagClick(item);
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <div
        className="buttons are-small is-centered mt-4 p-4"
        style={{ borderTop: "1px solid rgba(120, 120, 120, 0.5)" }}
      >
        <button className="button is-info" onClick={handleBack}>
          <span className="icon mr-1">
            <i className="fas fa-arrow-left"></i>
          </span>
          Вернуться
        </button>
      </div>
      <div className="title is-size-5 title-article has-text-centered">
        Вы выбрали{" "}
        <span className="title is-size-6">{favItems.length} позиций</span>
      </div>
      <UserIsLogin />
    </section>
  );
}

export default React.memo(FavoritesPage);
