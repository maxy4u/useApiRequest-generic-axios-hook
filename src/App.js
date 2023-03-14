import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const useApiRequest = (config) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios(config)
        .then((response) => {
          setIsLoaded(true);
          setData(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    };
    fetchData();
  }, [config]);

  return { error, isLoaded, data };
};

const Example = () => {
  const { data, error, isLoaded } = useApiRequest({
    url: "https://jsonplaceholder.typicode.com/todos",
    method: "get"
  });

  if (error !== null) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      items
      {data.map((item, ind) => (
        <div key={`item- ${ind}`}>
          {item.id} - {item.title}
        </div>
      ))}
    </div>
  );
};

export default Example;
