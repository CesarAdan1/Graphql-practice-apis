import React from "react";
import { Route, Routes } from "react-router";
import { MainPage } from "../pages/MainPage";
import { CharacterPage } from "../pages/CharacterPage";
import { NotFound } from "../pages/NotFound";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/character/:id" element={<CharacterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AllRoutes;
