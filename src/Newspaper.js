import { useEffect, useState } from "react";
import "./styles.css";
import Page from "./Page.js";

export default function Newspaper({ name }) {
  // we will use this state to set the data we get back from the fetch request
  const [newsPapers, setNewsPapers] = useState([]);
  // it's good practice to have a loading state - this will help if we want to disable a button to stop users from repeatedly clicking and possibly breaking the application
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // set the loading state to true - since this is a promise, we know this will resolve sometime in the future
    setIsLoading(true);
    // to start - use fetch with a url argument
    fetch(
      `https://chroniclingamerica.loc.gov/search/pages/results/?andtext=${name}&format=json`
    )
      // resolve with a .then() and use the .json() method to extract the JSON body content from the response - otherwise you will just get the HTTP response
      .then((response) => response.json())
      // now that the data is in json format, we can use it. Just log the data to see if you get the correct response
      .then((data) => {
        console.log(data);
        // if there is data
        if (data) {
          // use the data returned to set the newsPapers state
          setNewsPapers(data);
        }
      })
      // make sure to catch any error that occurs (just console logging in this case)
      .catch((error) => console.log(error))
      // we can use the .finally() handler to set loading to false - finally returns a promise, and is called in both cases of fulfilled (successful) or rejected (error)
      .finally(() => setIsLoading(false));
  }, []);

  console.log(newsPapers);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {/* render newsPapers.items.length only if newsPapers.items exists */}
      {newsPapers.totalItems > 0 && (
        <div>
          <p>
            {newsPapers.totalItems} newspaper pages found, here is one for
            example.
          </p>
          <Page url={newsPapers.items[0].url} />
        </div>
      )}
      {newsPapers.totalItems == 0 && (
        <p>
          {" "}
          No newspapers in chroniclingamerica.gov database contain this name
        </p>
      )}
    </div>
  );
}
