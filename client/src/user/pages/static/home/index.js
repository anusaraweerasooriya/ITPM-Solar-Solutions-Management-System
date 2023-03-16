import React, { useEffect } from "react";
import { useGetUsersQuery } from "hooks/api-hook";

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

  return <div>{}</div>;
};

export default Home;
