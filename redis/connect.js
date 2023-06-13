import { createClient } from "redis";

const connect = () => {
  const client = createClient({
    url: process.env.REDIS_URL,
  });

  client.on("error", (err) => console.log("Redis Client Error", err));
  client.connect();
  return client;
};

export default connect();
