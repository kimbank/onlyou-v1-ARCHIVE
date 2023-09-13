import axios from "axios";
import Error from "@/components/error";

export default async function MatchingLayout({ application, before, dormancy, failure, selection, success, waiting }) {
  // const status = await axios.get('/api/matching/stauts')
  const status = "selection"

  switch (status) {
    case "application":
      return application;

    case "before":
      return before;

    case "dormancy":
      return dormancy;

    case "failure":
      return failure;

    case "selection":
      return selection;

    case "success":
      return success;

    case "waiting":
      return waiting;

    default:
      return <Error />
  }
}