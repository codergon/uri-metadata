import axiosjs from "axios";

type Metadata = Record<string, {}>;
type Callback<T> = (data: Metadata | null, error: Error | null) => T;

export async function get(
  url: string,
  isGrouped?: boolean | Callback<any>,
  callback?: Callback<any>
) {
  const axios = axiosjs.create({
    timeout: 5000,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Content-Type": "application/json, text/plain, */*",
    },
  });

  if (typeof isGrouped === "function") callback = isGrouped;

  let response: any;
  try {
    // GET META DATA FROM REMOTE URL
    response = await axios.get(url);
  } catch (err) {
    console.log(err?.message);
    return returnMeta(null, err.message, callback);
  }

  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(response?.data, "text/html");

  var metaObj = { meta: {}, og: {}, twitter: {} } as Metadata;
  const AddMeta = (attr: string | null, content: string | null) => {
    if (attr === null) return;
    if (attr.match(/^og:/s)) {
      metaObj["og"][isGrouped === false ? attr : attr.split(/^og:/s)[1]] =
        content;
    } else if (attr.match(/^twitter:/s)) {
      metaObj["twitter"][
        isGrouped === false ? attr : attr.split(/^twitter:/s)[1]
      ] = content;
    } else {
      metaObj["meta"][attr] = content;
    }
  };

  // PARSE RESPONSE AND EXTRACT METADATA
  var metas = htmlDoc.getElementsByTagName("meta");
  for (var i = 0; i < metas.length; i++) {
    var name = metas[i].getAttribute("name");
    var content = metas[i].getAttribute("content");
    var property = metas[i].getAttribute("property");
    AddMeta(name !== null ? name : property, content);
  }

  console.log(metaObj);

  return returnMeta(
    isGrouped === false
      ? { ...metaObj["og"], ...metaObj["meta"], ...metaObj["twitter"] }
      : metaObj,
    null,
    callback
  );
}

const returnMeta = (
  data: Metadata | null,
  err: Error | null,
  callback?: Callback<any>
) => {
  if (callback) {
    return callback(data, err);
  } else {
    return err ? Promise.reject(err) : Promise.resolve(data);
  }
};
