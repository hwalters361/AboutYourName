import { useEffect, useState } from "react";
import "./styles.css";

export default function Newspaper({ url }) {
  const [page, setPage] = useState(null);
  const [pageLoading, setPageLoading] = useState(null);

  useEffect(() => {
    setPageLoading(true);
    fetch(url)
      // resolve with a .then() and use the .json() method to extract the JSON body content from the response - otherwise you will just get the HTTP response
      .then((response) => response.json())
      // now that the data is in json format, we can use it. Just log the data to see if you get the correct response
      .then((data) => {
        console.log("PAGE");
        console.log(data);
        console.log("PAGEEND");
        // if there is data
        if (data) {
          // use the data returned to set the newsPapers state
          setPage(data);
        }
      })
      // make sure to catch any error that occurs (just console logging in this case)
      .catch((error) => console.log(error))
      // we can use the .finally() handler to set loading to false - finally returns a promise, and is called in both cases of fulfilled (successful) or rejected (error)
      .finally(() => setPageLoading(false));
  }, []);

  console.log(page);
  return (
    <div>
      {pageLoading && <p>Loading pdf...</p>}
      {page && (
        <div>
          <h3>
            Title: {page.title.name}, issued on {page.issue.date_issued}
          </h3>
          <a href={page.pdf}>Link to PDF</a>
          <br />
          <iframe
            src={page.pdf}
            frameborder="0"
            height="500px"
            width="70%"
          ></iframe>
          <br />
        </div>
      )}
    </div>
  );
}
