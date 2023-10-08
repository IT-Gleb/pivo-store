import { usePivoSelector } from "../hooks/storeHooks";
import { checkerAuth } from "../libs";

function UserIsLoginName() {
  const userName = usePivoSelector((state) => state.currentUser.Name);
  const isUserLogin = usePivoSelector((state) => state.currentUser);
  const idAuth = checkerAuth(isUserLogin);

  if (!idAuth) return null;

  return (
    <p>
      <span className="icon mr-1">
        <i className="fas fa-user"></i>
      </span>
      <span>{userName}</span>
    </p>
  );
}

export default UserIsLoginName;
