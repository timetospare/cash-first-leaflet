# Cash First Information Leaflets

This website shows details of cash-first support available in various different areas.

## Preview

Preview the Sheffield example live: https://cash-first-leaflet.vercel.app/sheffield

## Edit content

This website relies on an Airtable base to display content of services available: https://airtable.com/tbltWQpNPa09g6kd7/viw0FFD1hJuYkBeHV?blocks=hide

Please contact IFAN if any contact is inaccurate or out of date, or if you can help with translations.

## How to make changes to content

**Do not** change the names of the fields or the tables in Airtable. This **_will_** cause the site to break.

To add content in new languages, append the 2 letter language code to the end of a new field name, e.g. `Description-fr` for the Description in French. This can be done on all the bases.

To add new services, add them to the "Step 3" table, make sure to fill out the "Option 2" field - this determines whether they will show up depending on what the user selects in step 1 and 2.

To add a new location, add a new row to the "General" table. The "Step 2" and "Step 3" tables will then give you the option to connect to this new location. On "Step 2" and "Step 3", you will also need to create a new "View". It's important that you name this view the same as the location - this is also case sensitive. (For spaces, e.g. "Tower Hamlets", replace the space with a "-", ie: "tower-hamlets").

e.g. To create "Doncaster", add a new row in General with "doncaster" as the "Location" field. Then create a view on both the Step 2 and Step 3 tables called "doncaster".

You will then be able to view the Doncaster leaflet by visiting `website/doncaster`

You can link entries in the Step 2 and Step 3 tables to more than one location. This is useful for example if you have a national service (e.g. Shelter). Instead of duplicating the row, you can just attach it to more different areas.

To add links to the top of the page (e.g. to the leaflet, poster or translations of these), add a row to the "Links" table. Make sure the "Name" field is the same as the other tables (e.g. "angus", "aberdeen", "tower-hamlets" etc). Each column in this table (if a value exists) will show up as a link button. The text on this button will be the column title (e.g "Poster" or "Leaflet"), and the link it goes to will be the value in the cell. Each link will open in a new tab.

## Language codes:

`const languageNames = { en: "English", es: "Spanish", fr: "French", bn: "Bengali", ur: "Urdu", ar: "Arabic", pl: "Polish", ro: "Romanian", fa: "Farsi", sk: "Slovakian", gd: "Gaelic", bg: "Bulgarian", ps: "Pashto", ae: "Ukrainian", zh: "Chinese (简单)", "zh-CHT": "Chinese (繁體)", };`
