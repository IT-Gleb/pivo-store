import { useGetRandomItemsQuery } from "../../store/punkApi/pivo.punk.api";
import type { IPivoItem } from "../../types";
import PivoSpinner from "../UI/Spinner/pivoSpinner";

function AllSkidkaItems() {
  const { isLoading, isError, data } = useGetRandomItemsQuery();

  if (isLoading) {
    return <PivoSpinner text="Гружу скидки..." />;
  }
  if (isError) {
    return (
      <div className="message is-danger is-light">
        <div className="message-body">
          <p>
            <span className="is-size-5 is-size-6-mobile">Ошибка!!!</span>
            Не могу загрузить данные по скидкам...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="block is-size-5 is-size-6-mobile is-center ">
      <ul>
        {data &&
          data.map((item: IPivoItem) => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default AllSkidkaItems;
