import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import { clearTvShows, getTvShows } from "../../Redux/actions";
import DataList from "../DataList/DataList";
import { Flex } from "@chakra-ui/react";

export default function HomeTVShows() {
  const dispatch = useDispatch();
  const series = useSelector((state) => state.series);
  const [page, setPage] = useState(1);
  const [seriesToShow, setSeriesToShow] = useState([]);

  useEffect(() => {
    dispatch(getTvShows(page));
    return () => dispatch(clearTvShows())
  }, [page]);

  useEffect(() => {
    setSeriesToShow((prev) => prev.concat(series));
  }, [series]);

  return (
    <div>
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar/>
        </Flex>
        <DataList data={seriesToShow} next={setPage} />
        <Footer />
    </div>
  );
}
