import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import { getSearchByQuery } from "../../Redux/actions";
import DataList from "../DataList/DataList";
import { useLocation, useMatch, useParams } from "react-router-dom";

export default function HomeSearch() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const [page, setPage] = useState(1);
  const [searchToShow, setSearchToShow] = useState([]);

  const form = useLocation().search;
  const query = new URLSearchParams(form).get("query");

  useEffect(() => {
    dispatch(getSearchByQuery(query, page));
    console.log(query);
  }, [page]);

  useEffect(() => {
    setSearchToShow((prev) => prev.concat(search));
  }, [search]);

  return (
    <div>
      <NavBar />
      <DataList data={searchToShow} next={setPage} />
      <Footer />
    </div>
  );
}
