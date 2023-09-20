import React from "react";
import { usePivoDispatch } from "../../../hooks/storeHooks";
import { deleteFromFav } from "../../../store/slices/favorites";

function DeleteFromFavoritesBtn({ paramId }: { paramId: number }) {
  const dispatch = usePivoDispatch();

  const handleDeleteFav = (pId: number) => {
    dispatch(deleteFromFav(pId));
  };

  return (
    <button
      className="button is-small is-danger is-outlined"
      onClick={(e) => {
        e.preventDefault();
        handleDeleteFav(paramId);
      }}
    >
      <span className="icon mr-1">
        <i className="fas fa-heart"></i>
      </span>
      Удалить из избранного
    </button>
  );
}

export default React.memo(DeleteFromFavoritesBtn);
