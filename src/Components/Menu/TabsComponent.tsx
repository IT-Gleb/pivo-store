import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Path, useLocation } from "react-router-dom";
import { usePivoSelector } from "../../hooks/storeHooks";
import { checkerAuth } from "../../libs";
import { type IUser } from "../../types";

type TabText = {
  id: number;
  Name: string;
  icon: string;
  isActive: boolean;
  Ref: string | Partial<Path>;
};

type Tabs = TabText[];

const tabNoAuth: Tabs = [
  {
    id: 0,
    Name: "Продукция",
    icon: "fa-wine-bottle",
    isActive: false,
    Ref: "/",
  },
  {
    id: 1,
    Name: "Авторизация",
    icon: "fa-user",
    isActive: false,
    Ref: "/login",
  },
];

const tabMenu: Tabs = [
  {
    id: 0,
    Name: "Продукция",
    icon: "fa-wine-bottle",
    isActive: false,
    Ref: "/",
  },
  {
    id: 1,
    Name: "Избранное",
    icon: "fa-heart",
    isActive: false,
    Ref: "/favorites",
  },
  {
    id: 2,
    Name: "Корзина",
    icon: "fa-shopping-cart",
    isActive: false,
    Ref: "/eCart",
  },
  {
    id: 3,
    Name: "Заказы",
    icon: "fa-list",
    isActive: false,
    Ref: "/orders",
  },
];

function TabsComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isWhere = useLocation();
  const isLogin: IUser = usePivoSelector((state) => state.currentUser);
  const isAuthUser = checkerAuth(isLogin);
  const [menuTabs, setMenuTabs] = useState<Tabs>(tabNoAuth);

  const handleActive = (
    event: React.MouseEvent<HTMLLIElement>,
    pindex: number
  ) => {
    event.preventDefault();
    // console.log(activeIndex);
    setActiveIndex(pindex);
  };

  //Задать активную вкладку в зависимости от текущкго пути
  useEffect(() => {
    // console.log(isWhere);

    let tmpIndex: number = 0;
    if (isAuthUser) {
      setMenuTabs(tabMenu);
    } else {
      setMenuTabs(tabNoAuth);
    }

    for (let item in menuTabs) {
      if (menuTabs[item].Ref === isWhere.pathname) {
        tmpIndex = Number(item);
        break;
      }
    }
    setActiveIndex(tmpIndex);
  }, [isWhere, isAuthUser]);
  //End of --------- Задать активную вкладку в зависимости от текущкго пути

  return (
    <div className="tabs is-boxed is-centered is-fullwidth pt-0 m-0 has-background-dark">
      <ul>
        {/* {tabMenu.map((tab: TabText) => ( */}
        {menuTabs.map<JSX.Element>((tab: TabText) => (
          <li
            key={tab.id}
            className={
              activeIndex === tab.id
                ? "is-active  is-size-6 is-size-7-mobile is-uppercase"
                : "is-size-6 is-size-7-mobile  is-uppercase"
            }
            onClick={(event) => handleActive(event, tab.id)}
          >
            <Link
              className={
                activeIndex === tab.id ? "has-text-dark " : "has-text-warning"
              }
              to={tab.Ref}
            >
              <div className="icon mr-2">
                <i className={`fas ${tab.icon}`}></i>
              </div>

              {tab.Name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(TabsComponent);
