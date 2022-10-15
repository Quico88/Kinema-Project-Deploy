import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import { clearSearchByQuery, getSearchByQuery } from "../../Redux/actions";
import DataList from "../DataList/DataList";
import { useLocation } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

export default function HomeSearch() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const [page, setPage] = useState(1);
  const [searchToShow, setSearchToShow] = useState([]);

  const form = useLocation().search;
  const query = new URLSearchParams(form).get("query");

  useEffect(() => {
    setPage(1)
    setSearchToShow([])
    return () => dispatch(clearSearchByQuery())
  }, [query]);

  useEffect(() => {
    dispatch(getSearchByQuery(query, page));
  }, [page, query]);

  useEffect(() => {
    setSearchToShow((prev) => prev.concat(search));
  }, [search]);

  return (
    <Flex direction="column">
      <Flex as="header" position="fixed" w="100%" zIndex={200}>
        <NavBar/>
      </Flex>
      <Flex as="main" mt={16} w="100%" direction='column'>
        <DataList data={searchToShow} next={setPage} />
        <Footer />
      </Flex>
    </Flex>
  );
}
