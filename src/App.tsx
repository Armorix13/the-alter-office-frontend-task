import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import "./App.css"

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}