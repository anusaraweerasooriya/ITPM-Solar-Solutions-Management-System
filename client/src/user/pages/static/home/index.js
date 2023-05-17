import React, { useEffect } from "react";
import { useGetUsersQuery } from "hooks/api-hook";
import SlideShow from "./SlideShow";

const Home = () => {
  const { data, error, isLoading, isFetching } = useGetUsersQuery({
    cache: "no-cache",
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <SlideShow />
    </div>
  );
};

export default Home;
