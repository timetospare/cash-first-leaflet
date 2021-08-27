const Checkboxes = ({ options, selected, updateSelected, rtl }) => {
  return (
    <form>
      <fieldset className="space-y-8 ">
        <legend className="sr-only">Step 1 Options</legend>
        {options?.map((opt) => (
          <div
            key={opt.id}
            className={`relative flex items-start ${
              rtl ? "text-right justify-end" : ""
            }`}
          >
            {!rtl && (
              <div className="flex items-center h-5">
                <input
                  checked={selected?.includes(opt.id)}
                  onChange={(e) => updateSelected(opt.id, e.target.checked)}
                  id={opt.id}
                  aria-describedby="candidates-description"
                  name={opt.id}
                  type="checkbox"
                  className="focus:ring-indigo-500 h-8 w-8 text-primary border-gray-300 rounded"
                />
              </div>
            )}

            <div className={`${rtl ? "mr-3" : "ml-3"} text-sm`}>
              <label htmlFor={opt.id} className="font-medium text-gray-700">
                {opt.title}
              </label>
              <span id="candidates-description" className="text-gray-500 block">
                <span className="sr-only">{opt.title} </span>
                <ul style={{ direction: rtl ? "rtl" : "ltr" }}>
                  {opt.details?.map((deet) => (
                    <li key={deet} className="list-disc list-inside my-1">
                      {deet}
                    </li>
                  ))}
                </ul>
              </span>
            </div>
            {rtl && (
              <div className="flex items-center h-5">
                <input
                  checked={selected?.includes(opt.id)}
                  onChange={(e) => updateSelected(opt.id, e.target.checked)}
                  id={opt.id}
                  aria-describedby="candidates-description"
                  name={opt.id}
                  type="checkbox"
                  className="focus:ring-indigo-500 h-8 w-8 text-primary border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        ))}
      </fieldset>
    </form>
  );
};

export default Checkboxes;
