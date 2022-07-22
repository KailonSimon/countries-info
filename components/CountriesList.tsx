import React, { useState } from "react";
import CountryCard from "./CountryCard";
import { filter, orderBy } from "lodash";
import { AnimatePresence } from "framer-motion";
import { debounce } from "lodash";

function CountriesList({ countries }: any) {
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleInputChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      const filtered = countries.filter((country: any) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      setFilteredCountries(filtered);
    },
    250
  );

  return (
    <div className="min-h-screen">
      <div className="flex justify-center h-min py-4">
        <input
          type="search"
          placeholder="Search"
          className="border-2 border-black px-2 py-2 rounded focus:outline-0 active:outline-0"
          onChange={handleInputChange}
        />
      </div>
      <div className="w-fit max-w-6xl flex flex-row flex-wrap justify-center gap-x-4 gap-y-8">
        {filteredCountries.length > 0 ? (
          <AnimatePresence>
            {orderBy(filteredCountries, ["name.common"], ["asc"]).map(
              (country: any) => {
                return (
                  <CountryCard key={country.name.common} country={country} />
                );
              }
            )}
          </AnimatePresence>
        ) : (
          <span>No matching countries</span>
        )}
      </div>
    </div>
  );
}

export default CountriesList;
