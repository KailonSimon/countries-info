import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useState } from "react";
import CountriesList from "../components/CountriesList";
import Layout from "../components/Layout";
import { debounce } from "lodash";

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};

const Home: NextPage = ({
  countries,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
    <Layout>
      <div className="w-full flex flex-col overflow-hidden">
        <div className="flex justify-center h-min py-4">
          <input
            type="search"
            placeholder="Search"
            className="border-2 border-black px-2 py-2 rounded focus:outline-0 active:outline-0"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full flex justify-center mb-4">
          <div className="min-h-screen">
            <CountriesList countries={filteredCountries} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
