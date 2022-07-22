import type {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CountriesList from "../components/CountriesList";
import CountryOverlay from "../components/CountryOverlay";
import Layout from "../components/Layout";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { code: [] } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();
  const [countryCode = null] = (params?.code as string[]) || [];

  return {
    props: {
      countries,
      code: countryCode,
    },
  };
};

const Home: NextPage = ({
  countries,
  code,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [openCountry, setOpenCountry] = useState(null);
  let [isOpen, setIsOpen] = useState(true);

  function onClose() {
    router.push("/", undefined, { scroll: false }).catch((e) => {
      console.error(e);
    });
    setIsOpen(false);
    setOpenCountry(null);
  }

  function openModal() {
    setIsOpen(true);
    if (code) {
      setOpenCountry(
        countries.find(
          (country: any) => country.cca2.toLowerCase() == code.toLowerCase()
        )
      );
    }
  }

  useEffect(() => {
    if (code) {
      setOpenCountry(
        countries.find(
          (country: any) => country.cca2.toLowerCase() == code.toLowerCase()
        )
      );
    }
  }, [code, countries, isOpen]);

  return (
    <Layout>
      <div className="w-full flex flex-col overflow-hidden">
        <div className="w-full flex justify-center mb-4">
          {countries && <CountriesList countries={countries} />}
          {openCountry && (
            <CountryOverlay country={openCountry} onClose={onClose} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
