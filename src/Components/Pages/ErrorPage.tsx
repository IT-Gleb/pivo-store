import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div className="container p-4">
      <div className="message is-danger is-small mt-6">
        <div className="message-header">ВНИМАНИЕ! что-то пошло не так...</div>
        <div className="message-body">
          <p className="is-size-4 has-text-centered p-4">Произошла ошибка!</p>
        </div>
        <div className="message-footer has-text-centered pb-2">
          <button className="button is-warning is-small" onClick={handleClick}>
            Вернуться
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
