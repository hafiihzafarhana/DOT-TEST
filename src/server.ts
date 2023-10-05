import App from "@/app";
import IndexRoute from "@api/index/index.route";
import AuthRoute from "@api/auth/auth.route";
import UserRoute from "@api/user/user.route";
import BookRoute from "@api/book/book.route";
import BookBorrowRoute from "./api/borrowBook/bookBorrow.route";

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new UserRoute(),
  new BookRoute(),
  new BookBorrowRoute(),
]);

app.listen();
