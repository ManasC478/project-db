import client from "./connect";

const setObject = async (key, value) => {
  await client.set(key, JSON.stringify(value));
};

const getObject = async (key) => {
  const value = await client.get(key);
  return JSON.parse(value);
};

const getIfObjectExists = async (key) => {
  if (await client.exists(key)) {
    return await getObject(key);
  }
};

export default { setObject, getObject, getIfObjectExists };
