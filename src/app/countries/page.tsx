"use client";
import { setCountries } from "@/redux/features/countrySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Country } from "@/types";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

function page() {
  const { countries } = useAppSelector((state) => state.countryReducer);
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [countryDetails, setCountryDetails] = useState<any>("");

  const filteredCountry =
    query === ""
      ? countries
      : countries.filter((country: Country) => {
        return (
          country.name.toLowerCase().includes(query.toLowerCase()) ||
          country.officialName.toLowerCase().includes(query.toLowerCase())
        );
      });

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data: Country[] = await response.json();

      const countries = data.map((country: any) => {
        const newCountry: Country = {
          name: country.name.common,
          officialName: country.name.official,
          capital: country.capital,
          flag: country.flags.svg,
          flag_alt: country.flags.alt,
          population: country.population,
          cca3: country.cca3,
        };

        return newCountry;
      });
      dispatch(setCountries(countries));
    };
    getCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    const getCountryDetails = async (name: string) => {
      console.log("request sent");
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const data = await response.json();
      const country: Country = data[0];
      setCountryDetails(country);
    };
    getCountryDetails(selectedCountry?.name);
  }, [selectedCountry]);

  return (
    <>
      <Combobox as="div" value={selectedCountry} onChange={setSelectedCountry}>
        {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Combobox.Label> */}
        <div className="relative mt-2">
          <Combobox.Input
            className="w-full rounded-md border-0 container bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(country: Country) => country?.name}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 py-3 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />,
          </Combobox.Button>

          {filteredCountry.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredCountry.map((country) => (
                <Combobox.Option
                  key={country.name}
                  value={country}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={clsx(
                          "block truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {country.name}
                      </span>
                      {selected && (
                        <span
                          className={clsx(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            active ? "text-white" : "text-indigo-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      <hr />
      <div className="w-50 h-50 bg-amber-300"></div>
      {countryDetails && (
        <div className="bg-white pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32">
          <div className="bg-gray-900 pb-20 sm:pb-24 xl:pb-0">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
              <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                  <Image
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                    src={countryDetails.flags.svg}
                    alt=""
                    fill
                  />
                </div>
              </div>
              <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
                <div className="flex flex-col justify-center">
                  <div className="text-white">Native Names</div>
                  <div className="flex gap-2">
                    {countryDetails.name.nativeName &&
                      Object.keys(countryDetails.name.nativeName).map((key) => (
                        <span
                          key={key}
                          className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
                        >
                          {countryDetails.name.nativeName[key].common}
                        </span>
                      ))}
                  </div>
                </div>
                <figure className="relative isolate pt-6 sm:pt-12">
                  <svg
                    viewBox="0 0 162 128"
                    fill="none"
                    aria-hidden="true"
                    className="absolute left-0 top-0 -z-10 h-32 stroke-white/20"
                  >
                    <path
                      id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                      d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                    />
                    <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x={86} />
                  </svg>
                  <blockquote className="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                    <p>
                      {countryDetails.name.common} is a country in{" "}
                      {countryDetails.region} with a{" "}
                      <span className="text-yellow-500 dark:text-amber-500">
                        population
                      </span>{" "}
                      of{" "}
                      <NumericFormat
                        value={countryDetails.population}
                        thousandSeparator=","
                        displayType="text"
                      />
                      . Its capital is {countryDetails.capital[0]}.
                      {countryDetails.borders && (
                        <>
                          There are {countryDetails.borders.length} countries
                          bordering {countryDetails.name.common}. Those
                          countries are{" "}
                          {countryDetails.borders.map(
                            (border: string) =>
                              countries.find(
                                (country) => country.cca3 === border
                              )!.name + " "
                          )}
                        </>
                      )}
                    </p>
                  </blockquote>
                  <figcaption className="mt-8 text-base">
                    <div className="font-semibold text-white">Judith Black</div>
                    <div className="mt-1 text-gray-400">CEO of Workcation</div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default page;
