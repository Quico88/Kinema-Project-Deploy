import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import { getTvShows } from "../../Redux/actions";
import DataList from "../DataList/DataList";

export default function HomeSearch() {
  const dispatch = useDispatch();
  const series = useSelector((state) => state.series);
  const [page, setPage] = useState(1);
  const [searchToShow, setSearchToShow] = useState([]);

  let { search } = useParams();

  useEffect(() => {
    dispatch(getTvShows(page));
  }, [page]);

  useEffect(() => {
    setSeriesToShow((prev) => prev.concat(series));
  }, [series]);

  return (
    <div>
        <NavBar />
        <DataList data={seriesToShow} next={setPage} />
        <Footer />
    </div>
  );
}
