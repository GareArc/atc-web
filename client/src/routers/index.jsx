import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../views/HomePage";
import { CreatePage } from "../views/CreatePage";
import { HistoryPage } from "../views/HistoryPage";
import { HomePageBody } from "../views/HomePage/Body";

export const WebRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="" element={<HomePageBody />} />
          <Route path="createPage" element={<CreatePage />} />
          <Route path="historyPage" element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}