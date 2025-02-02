import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      console.log(name);
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            const country = { ...resp, found: true };
            setCountry(country);
            console.log(country);
          }
        })
        .catch((error) => {
          setCountry({ found: false });
          console.log("from the catch block", error);
        });
    }
  }, [name]);

  // console.log(country.found)

  return country;
};

const Country = ({ country }) => {
  console.log(country);
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div> Country Not Found</div>;
  }

  return (
    <div className="mt-5">
      <h3 className="">{country.data.name.common} </h3>
      <div>Capital {country.data.capital} </div>
      <div>Population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState(null);
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  console.log(country);
  return (
    <div>
      <form
        onSubmit={fetch}
        className="text-4xl p-5 ring-8 ring-blue-200 bg-sky-600 rounded-3xl flex gap-3.5 w-xl"
      >
        <label for="query"> </label>
        <input
          {...nameInput}
          placeholder="United States...."
          id="query"
          className="bg-transparent p-0 m-0 h-9 w-100 placeholder:text-gray-700"
        />
        <div id="search" className="relative h-12">
          <button
            aria-label="submit"
            type="submit"
            className="bg-transparent cursor-pointer w-12 "
          >
            <div className=" border-cyan-100 w-8 h-8 border-6 rounded-full  "></div>
            <span className=" absolute w-6 border-3 rounded-sm border-cyan-100 transform-[rotateZ(45deg)]  "></span>
          </button>
        </div>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
