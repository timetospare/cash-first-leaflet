import { useEffect, useState } from "react";
import { CheckIcon, SearchIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import fetchSuggestedPostcodes from "../methods/fetchPostcodes";

const people = [
  { id: 1, name: "Leslie Alexander" },
  // More users...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PostcodeLookup({ handleSearch }) {
  const [query, setQuery] = useState("");

  const [postcodes, setPostcodes] = useState([]);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected && handleSearch) {
      handleSearch(selected);
    } else {
      handleSearch(null);
    }
  }, [selected]);

  useEffect(() => {
    if (query) {
      fetchSuggestedPostcodes({ searchText: query })
        .then((data) => {
          setPostcodes(data);
        })
        .catch((err) => {
          //swallow error
        });
    } else {
      setSelected(null);
    }
  }, [query]);

  const filteredPeople =
    query === ""
      ? postcodes
      : postcodes.filter((result) => {
          return result.id.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selected}
      onChange={setSelected}
      className="mb-8 max-w-sm"
    >
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        Postcode Search
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person) => person?.id || ""}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {person.id} - <i>{person?.names?.laua}</i>
                    </span>

                    {selected && (
                      <span
                        className={classNames(
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
  );
}
