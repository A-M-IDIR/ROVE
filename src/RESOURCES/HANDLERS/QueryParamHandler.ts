function GetParam(paramKey: string) {
  const queryParams = new URLSearchParams(location.search);

  return queryParams.get(paramKey);
}

function RemoveParam(paramKey: string) {
  const queryString = location.search;
  const paramsArray = queryString.substring(1).split("&");

  const filteredParams = paramsArray.filter((param) => {
    const [key] = param.split("=");
    return key !== paramKey;
  });

  return "?" + filteredParams.join("&");
}

function UpdateParam(paramKey: string, newParamValue: string) {
  const queryString = location.search;
  const paramsArray = queryString.substring(1).split("&");
  let paramExists = false;

  let updatedParams = paramsArray.map((param: string) => {
    const key = param.split("=");

    if (key[0] === paramKey) {
      paramExists = true;
      return `${key[0]}=${newParamValue}`;
    }
    return param;
  });

  if (!paramExists) {
    updatedParams.push(`${paramKey}=${newParamValue}`);
  }

  if (queryString === "") {
    return `?${updatedParams.join("")}`;
  }

  return "?" + updatedParams.join("&");
}

export const QueryParamHandler = {
  GetParam,
  UpdateParam,
  RemoveParam,
};
