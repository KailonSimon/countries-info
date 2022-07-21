import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { IoClose } from "react-icons/io5";
import Layout from "../../components/Layout";

interface IParams extends ParsedUrlQuery {
  code: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();

  const paths = countries.map((country: any) => ({
    params: { code: country.cca2 },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { code } = context.params as IParams;
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  const data = await res.json();

  return {
    props: {
      country: data[0],
    },
  };
};

function CountryPage({
  country,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className="relative h-96 w-full bg-gray-900 text-white flex flex-col px-8 py-8 rounded-2xl">
        <h1 className="text-4xl">{country.name.common}</h1>
        {country.name.common !== country.name.official && (
          <h2 className="text-2xl">{`(${country.name.official})`}</h2>
        )}
        <Link href={"/"}>
          <button className="rounded w-min absolute top-4 right-4 hover:bg-red-600">
            <IoClose className="text-3xl" />
          </button>
        </Link>
      </div>
    </Layout>
  );
}

export default CountryPage;
