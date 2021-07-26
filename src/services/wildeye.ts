import axios from "axios";
import {Site} from "../model/site";
import {DateTime} from "luxon";

export async function query(logger:string, fromDate: DateTime) : Promise<Site> {
  const url = `api/sites?deviceid=${logger}&from=${fromDate.toFormat('dd/MMM/yyyy')}`
  const response = await axios.get(url, {});
  return response.data as Site
}
