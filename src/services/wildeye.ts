import axios from "axios";
import {Site} from "../model/site";

export async function query(logger:string, fromDate: Date) : Promise<Site> {
  const url = `api/sites?deviceid=${logger}&from=20/jul/2021`
  const response = await axios.get(url, {});
  return response.data as Site
}
