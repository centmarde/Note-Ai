function setRouter() {
  const path = window.location.pathname;
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  switch (path) {
    case "/":
    case "/index.html":
    case "/register.html":
      if (isLoggedIn) {
        window.location.pathname = "/note.html"; // default page when logged in
      }
      break;

    case "/note.html":
      if (!isLoggedIn) {
        window.location.pathname = "/index.html";
      }
      break;

    default:
      break;
  }
}

export { setRouter };
