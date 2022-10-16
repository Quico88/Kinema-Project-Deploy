import React from "react";
import Card from "./Card";
import { Wrap, Flex } from "@chakra-ui/react";
import { DotSpinner } from "@uiball/loaders";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

export default function DataList({ data, next }) {
  
  return (
    <InfiniteScroll
      dataLength={data.length}
      hasMore={true}
      next={() => next((prev) => prev + 1)}
      loader={
        <Flex alignItems="center" justify="center" minH={500}>
          <DotSpinner size={100} speed={1} color="black" />
        </Flex>
      }
    >
      <Wrap justify="center" my="10" pt={6} >
        {data?.map((m) => {
          if (m.serie) {
            return (
              <Link to={`/home/tv_show_details/${m.id}`} >
                <Card
                  posterUrl={"https://image.tmdb.org/t/p/w300" + m.poster}
                  id={m.id}
                  key={m.id}
                />
              </Link>
            );
          } else {
            return (
              <Link to={`/home/movie_details/${m.id}`}>
                <Card
                  posterUrl={"https://image.tmdb.org/t/p/w300" + m.poster}
                  id={m.id}
                  title={m.title}
                  key={m.id}
                />
              </Link>
            );
          }
        })}
      </Wrap>
    </InfiniteScroll>
  );
}
