import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePivoDispatch, usePivoSelector } from "../../hooks/storeHooks";
import { IPivoItem, MaxPerPage } from "../../types";
import SmallItemCard from "../PivoItem/SmallItemCard";
import UserIsLogin from "../userIsLogin";
import { setCurrentPage } from "../../store/slices/favorites";
import { AnimatePresence } from "framer-motion";
import BackButton from "../UI/Buttons/backButton";

function FavoritesPage() {
  const favItems = usePivoSelector((state) => state.favorites.items);
  const dispatch = usePivoDispatch();
  const currPage = usePivoSelector((state) => state.favorites.currentPage);
  const [activePage, setActivePage] = useState<number>(currPage);
  const [pageCount, setPageCount] = useState<number>(1);
  const [pageItems, setPageItems] = useState<IPivoItem[]>([]);
  const [pages, setPages] = useState<number[]>([]);

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
      {favItems.length < 1 && (
        <article className="message">
          <div className="message-body is-size-1 has-text-centered">
            У Вас нет товаров в избранном.
          </div>
        </article>
      )}
      <div className="small-item-grid">
        <AnimatePresence>
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
        </AnimatePresence>
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
        <BackButton />
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
