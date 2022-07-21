import CountryCard from "./CountryCard";
import { orderBy } from "lodash";
import { AnimatePresence } from "framer-motion";

function CountriesList({ countries }: any) {
  return (
    <div className="w-fit max-w-6xl flex flex-row flex-wrap justify-center gap-x-4 gap-y-8">
      {countries.length > 0 ? (
        <AnimatePresence>
          {orderBy(countries, ["name.common"], ["asc"]).map((country: any) => {
            return <CountryCard key={country.name.common} country={country} />;
          })}
        </AnimatePresence>
      ) : (
        <span>No matching countries</span>
      )}
    </div>
  );
}

export default CountriesList;
