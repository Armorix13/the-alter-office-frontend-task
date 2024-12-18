import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import "./App.css";
import { Provider } from "react-redux";
import store from "./Redux/store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />;
      </Provider>
    </>
  );
}
