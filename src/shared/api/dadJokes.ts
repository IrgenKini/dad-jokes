import axios, { AxiosResponse } from "axios";

/**
 * Get dad jokes by filter
 */
export async function getDadJokes(filter?: string): Promise<AxiosResponse> {
  return await axios.get(`https://icanhazdadjoke.com/search`, {
    params: {
      term: filter,
    },
    headers: {
      Accept: "application/json",
    },
  });
}
