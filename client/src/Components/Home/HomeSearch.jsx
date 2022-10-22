import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import { clearSearchByQuery, getSearchByQuery } from "../../Redux/actions";
import DataList from "../DataList/DataList";
import { useLocation } from "react-router-dom";
import { Flex, Divider, Center, Text } from "@chakra-ui/react";
import Loader from "../Loader/LoaderCards";
import Error from "../Error/Error";
import "@fontsource/raleway";

export default function HomeSearch() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const [page, setPage] = useState(1);
  const [searchToShow, setSearchToShow] = useState([]);
  const error = useSelector((state) => state.error);

  const form = useLocation().search;
  const query = new URLSearchParams(form).get("query");

  useEffect(() => {
    setPage(1);
    setSearchToShow([]);
    return () => dispatch(clearSearchByQuery());
  }, [query]);

  useEffect(() => {
    dispatch(getSearchByQuery(query, page));
  }, [page, query]);

  useEffect(() => {
    setSearchToShow((prev) => prev.concat(search));
  }, [search]);

  if (error) {
    return <Error />;
  } else {
    return (
      <Flex direction="column" bgGradient="linear(to-b, #222222, #333333)">
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar />
        </Flex>
        <Flex as="main" mt={16} w="100%" direction="column">
          <Flex
            direction="row"
            mt={10}
            mb={5}
            justify="space-around"
            alignItems="center"
            color="white"
            fontSize={40}
            fontWeight="400"
            fontFamily="Raleway"
          >
            Results for "{query}"
          </Flex>
          <Center>
            <Divider
              borderColor="white"
              borderWidth="1px"
              width="30%"
              border="1px"
              opacity="1"
            />
          </Center>
          {searchToShow.length === 0 ? (
            <Center h="90vh">
              <Center w="95%" mb={30} pt={70} pb={70} borderColor="white">
                <Text fontSize={30} color="white">
                  No results...
                </Text>
              </Center>
            </Center>
          ) : (
            <DataList
              data={searchToShow}
              next={setPage}
              hasMore={search.length > 19}
            />
          )}
          <Footer />
        </Flex>
      </Flex>
    );
  }
}
