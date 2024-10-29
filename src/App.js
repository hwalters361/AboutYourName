import "./styles.css";

import Entry from "./Entry.js";
import Newspaper from "./Newspaper.js";

import React, { useState } from "react";

function App() {
  // genderize api
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [probability, setProbability] = useState("");
  // behindthename api
  const [nameInfo, setNameInfo] = useState(null);
  const [error, setError] = useState(null);
  //wikipedia api
  const [wikipediaData, setWikipediaData] = useState(null);
  const [wikipediaError, setWikipediaError] = useState(null);
  const [wikipediaDataSurname, setWikipediaDataSurname] = useState(null);
  const [wikipediaErrorSurname, setWikipediaErrorSurname] = useState(null);
  // rhyming words
  const [rhymeData, setrhymeData] = useState(null);
  const [rhymeError, setrhymeError] = useState(null);
  // possible alias's
  const [aliasData, setAliasData] = useState(null);
  const [aliasError, setAliasError] = useState(null);
  // find newspaper
  const [findNewspaper, setFindNewspaper] = useState(null);
  const [robo, setRobo] = useState(null);

  const handleFirstNameChange = (event) => {
    setFindNewspaper(false);
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setFindNewspaper(false);
    setLastName(event.target.value);
  };

  const getEmojiFlag = (countryName) => {
    const flags = {
      French: "🇫🇷",
      Portuguese: "🇵🇹",
      Spanish: "🇪🇸",
      German: "🇩🇪",
      English: "🇬🇧",
      "English (Modern)": "🇬🇧",
      Romanian: "🇷🇴",
      Czech: "🇨🇿",
      Georgian: "🇬🇪",
      Croatian: "🇭🇷",
      Finnish: "🇫🇮",
      Dutch: "🇳🇱",
      Slovak: "🇸🇰",
      Danish: "🇩🇰",
      Swedish: "🇸🇪",
      Norwegian: "🇳🇴",
      Icelandic: "🇮🇸",
      Turkish: "🇹🇷",
      Japanese: "🇯🇵",
      Korean: "🇰🇷",
      Chinese: "🇨🇳",
      Vietnamese: "🇻🇳",
      Thai: "🇹🇭",
      Indonesian: "🇮🇩",
      Malay: "🇲🇾",
      Brazilian: "🇧🇷",
      Russian: "🇷🇺",
      Ukrainian: "🇺🇦",
      Polish: "🇵🇱",
      Irish: "🇮🇪",
      Bulgarian: "🇧🇬",
      Hungarian: "🇭🇺",
      Catalan: "🇪🇸",
      Austrian: "🇦🇹",
      Serbian: "🇷🇸",
      Bosnian: "🇧🇦",
      Latvian: "🇱🇻",
      Algerian: "🇩🇿",
      Egyptian: "🇪🇬",
      Lebanese: "🇱🇧",
      Jordanian: "🇯🇴",
      Azerbaijani: "🇦🇿",
      Armenian: "🇦🇲",
      Persian: "🇮🇷",
      Uzbek: "🇺🇿",
      Kazakh: "🇰🇿",
      Tajik: "🇹🇯",
      Kyrgyz: "🇰🇬",
      Turkmen: "🇹🇲",
      "South African": "🇿🇦",
      Somali: "🇸🇴",
      Kenyan: "🇰🇪",
      Ugandan: "🇺🇬",
      Ethiopian: "🇪🇹",
      Nigerian: "🇳🇬",
      Ghanaian: "🇬🇭",
      Cameroonian: "🇨🇲",
      Niger: "🇳🇮",
      Ghana: "🇬🇭",
      Cameroon: "🇨🇲",
      Nigeria: "🇳🇮",
      Senegal: "🇸🇳",
      Morrocan: "🇲🇦",
      Akan: "🇬🇭",
      Shona: "🇿🇼",
      Luhya: "🇰🇪",
      Amhara: "🇪🇹",
      Chewa: "🇲🇼",
      Fulani: "🇸🇳",
      Hausa: "🇳🇬",
      Hutu: "🇷🇼",
      Igbo: "🇬🇶",
      Yoruba: "🇧🇯",
      Zulu: "🇿🇦",
      Yao: "🇲🇼",
      Sotho: "🇱🇸",
      Arabic: "🇪🇬",
      Slovene: "🇸🇮",
      Galican: "🇪🇸",
    };

    const flag = flags[countryName];
    return flag ? flag : "";
  };

  const handleSubmit = async (event) => {
    setFindNewspaper(false);
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.genderize.io/?name=${firstName}`
      );
      const data = await response.json();
      setGender(data.gender);
      setProbability(data.probability);
    } catch (error) {
      console.error("Error fetching gender:", error);
    }

    try {
      const response = await fetch(
        `https://www.behindthename.com/api/lookup.json?name=${firstName}&key=ha996141752`
      );
      if (!response.ok) {
        setError("Error fetching data. Please try again later.");
        return;
      }

      const data = await response.json();

      if (data.error_code) {
        setNameInfo(null);
        setError("Name does not exist in behindthename API.");
      } else {
        setError(null);
        setNameInfo(data);
      }
    } catch (error) {
      setNameInfo(null);
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", error);
    }

    // Wikipedia first name info

    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${firstName}`
      );
      if (!response.ok) {
        setWikipediaData(null);
        setWikipediaError("Error fetching data. Please try again later.");
      }

      const data = await response.json();
      setWikipediaData(data);

      if (data.extract.indexOf("may refer to") !== -1) {
        try {
          const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${firstName}_(given_name)`
          );
          if (!response.ok) {
            setWikipediaData(null);
            setWikipediaError("Error fetching data. Please try again later.");
          } else {
            const data = await response.json();
            setWikipediaData(data);
          }
        } catch (error) {
          setWikipediaData(null);
          setWikipediaError("Error fetching data. Please try again later.");
        }
      }
      setWikipediaError(null);
    } catch (error) {
      setWikipediaData(null);
      setWikipediaError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", error);
    }

    // Wikipedia Surname Info

    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${lastName}`
      );
      if (!response.ok) {
        setWikipediaDataSurname(null);
        setWikipediaErrorSurname(
          "Error fetching surname data. Please try again later."
        );
      } else {
        const data = await response.json();
        setWikipediaDataSurname(data);
        setWikipediaErrorSurname(null);

        if (data.extract.indexOf("may refer to") !== -1) {
          try {
            const response = await fetch(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${lastName}_(surname)`
            );
            if (!response.ok) {
              setWikipediaDataSurname(null);
              setWikipediaErrorSurname(
                "Error fetching surname. Please try again later."
              );
            } else {
              const data = await response.json();
              setWikipediaDataSurname(data);
            }
          } catch (error) {
            setWikipediaDataSurname(null);
            setWikipediaErrorSurname(
              "Error fetching surname. Please try again later."
            );
          }
        }
        setWikipediaError(null);
      }
    } catch (error) {
      setWikipediaDataSurname(null);
      setWikipediaErrorSurname(
        "Error fetching surname data. Please try again later."
      );
      console.error("Error fetching data:", error);
    }

    try {
      const response = await fetch(
        `https://rhymebrain.com/talk?function=getRhymes&maxResults=10&word=${firstName}`
      );
      const data = await response.json();
      if (!response.ok) {
        setrhymeError("Could not retrieve rhymes");
        setrhymeData(null);
      } else {
        setrhymeData(data);
        setrhymeError(null);
      }
    } catch (error) {
      setrhymeError("Could not retrieve rhymes");
      setrhymeData(null);
    }

    try {
      const response = await fetch(
        `https://www.behindthename.com/api/related.json?name=${firstName}&usage=eng&key=ha996141752`
      );
      const data = await response.json();
      if (!response.ok) {
        setAliasError("Could not retrieve alias data");
        setAliasData(null);
      } else {
        setAliasData(data.names);
        if (data.names.length == 0) {
          setAliasData(["No aliases in database"]);
        }
        setAliasError(null);
      }
    } catch {
      setAliasError("Could not retrieve alias data");
      setAliasData(null);
    }

    setFindNewspaper(true);

    try {
      console.log("ROBO1");
      const response = await fetch(
        `https://robohash.org/${firstName}${lastName}.png?set=set4`
      );
      console.log("ROBO2");
      console.log(response);
      if (response.ok) {
        setRobo(response.url);
      }
    } catch {
      console.log("couldn't get robo");
    }
  };

  return (
    <div>
      <h1>About Your Name!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
        <br />
        <h4>
          Hello {firstName} {lastName}!
        </h4>
        <button type="submit">Submit</button>
      </form>
      {gender && (
        <div className="centered">
          <div>
            <h3>Predicted Gender</h3>
            <h3>{gender.charAt(0).toUpperCase() + gender.slice(1)}</h3>
            <p>Probability: {Math.round(probability * 100)}%</p>
          </div>
          <div className="probability-graph">
            <div
              className={"bar-" + gender}
              style={{ height: `${probability * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      {nameInfo && (
        <div>
          <h2>{nameInfo[0].name}</h2>
          <p>
            Gender of usage is typically{" "}
            {nameInfo[0].gender == "m"
              ? " male"
              : nameInfo[0].gender == "f"
              ? " female"
              : " ambiguous"}
          </p>
          <h3>Usages in different ethnicities:</h3>
          <ul id="ethnicities">
            {nameInfo[0].usages.map((usage) => (
              <li key={usage.usage_code}>
                {usage.usage_full} : ({usage.usage_gender}){" "}
                {getEmojiFlag(usage.usage_full)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {wikipediaError && <p>{wikipediaError}</p>}
      {wikipediaData && (
        <div>
          <h2>{wikipediaData.title}</h2>
          {wikipediaData.extract}
        </div>
      )}
      {wikipediaErrorSurname && <p>{wikipediaErrorSurname}</p>}
      {wikipediaDataSurname && (
        <div>
          <h2>{wikipediaDataSurname.title}</h2>
          {wikipediaDataSurname.extract}
        </div>
      )}
      {rhymeError && <p>{rhymeError}</p>}
      {rhymeData && (
        <div>
          <h2>
            {" "}
            Words that rhyme with{" "}
            {firstName.charAt(0).toUpperCase() + firstName.slice(1)}{" "}
          </h2>
          <ul id="ethnicities">
            {rhymeData.map((wordItem, index) => (
              <li key={index}>
                <strong>Word:</strong> {wordItem.word} |{" "}
                <strong>Syllables:</strong> {wordItem.syllables}
              </li>
            ))}
          </ul>
        </div>
      )}
      {aliasError && <p>{aliasError}</p>}
      {aliasData && (
        <div>
          <h2>
            Aliases for {firstName.charAt(0).toUpperCase() + firstName.slice(1)}
          </h2>
          <ul id="ethnicities">
            {aliasData.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
      {findNewspaper && (
        <div>
          <h2>Historical newspaper containing your first name "{firstName}"</h2>
          <Newspaper name={firstName} />
        </div>
      )}
      {findNewspaper && (
        <div>
          <h2>Historical newspaper containing your last name "{lastName}"</h2>
          <Newspaper name={lastName} />
        </div>
      )}
      {robo && (
        <div>
          <h2>
            Here is a randomly generated cat created from your first and last
            name.
          </h2>
          <img src={robo} />
        </div>
      )}
    </div>
  );
}

export default App;
