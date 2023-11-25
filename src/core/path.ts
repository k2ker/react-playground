export const Path = {
  main: "/",
  login: "/login",
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
};
