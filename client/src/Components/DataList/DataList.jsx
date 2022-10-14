import React from "react";
import Card from "./Card";
import { Wrap, Center } from "@chakra-ui/react";
import { DotWave } from "@uiball/loaders";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

export default function DataList({ data, next }) {
  return (
    <InfiniteScroll
      dataLength={data.length}
      hasMore={true}
      next={() => next((prev) => prev + 1)}
      loader={
        <Center>
          <DotWave size={47} speed={1} color="black" />
        </Center>
      }
    >
      <Wrap justify="center" my="10">
        {data?.map((m) => {
          if (m.serie) {
            return (
              <Link to={`/home/tv_show_details/${m.id}`}>
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
