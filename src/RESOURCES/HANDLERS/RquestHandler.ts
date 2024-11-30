import axios, { AxiosRequestConfig } from "axios";

type TypeConfig = {
  key: string;
  config?: AxiosRequestConfig;
};

type TypeResult<T> = {
  data?: T;
  error?: any;
};

export default async function RequestHandler<T = any>(
  config: TypeConfig
): Promise<TypeResult<T>> {
  try {
    const response = await axios({
      method: "GET",
      ...config.config,
    });

    return { data: response.data };
  } catch (error) {
    if (config.key)
      console.error(`Fetch Error For Request With Key :: ${config.key}`);

    return { error };
  }
}
