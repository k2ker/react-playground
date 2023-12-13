export const Path = {
  main: "/",
  login: "/login",
  employee: "/employee",
  product: "/product",
  youtube: "/youtube",
  viewer: "/viewer",
};

export const PagesConfig = {
  [Path.main]: {
    showHaeder: true,
    title: "메인",
  },
  [Path.login]: {
    showHaeder: false,
    title: "로그인",
  },
  [Path.employee]: {
    showHaeder: true,
    title: "직원",
  },
  [Path.product]: {
    showHaeder: true,
    title: "상품",
  },
  [Path.youtube]: {
    showHaeder: true,
    title: "유튜브",
  },
  [Path.viewer]: {
    showHaeder: false,
    title: "뷰어",
  },
};

export const NavPage = [
  {
    path: Path.employee,
    name: "직원",
  },
  {
    path: Path.product,
    name: "상품",
  },
  {
    path: Path.youtube,
    name: "유튜브",
  },
];
