import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  try {
    const response = await fetch(env.SERVER_URL);
    if (!response.ok) {
      throw error(response.status, response.statusText);
    }
    const data = await response.json();
    return { dataTest: data };
  } catch (error) {
    throw error(500, error.message);
  }
};
// export const load: PageServerLoad = async ()=>{
//    const [networkError, response] ?= await fetch(env.SERVER_URL);
// if (networkError) return console.error(networkError);
// const [parseError, data] ?= await response.json();
// if (parseError) return console.error(parseError);
// return data;
// dostosowac to pod funcje powyzej i przetestowac, jest to alternatywa try-catch

// };
