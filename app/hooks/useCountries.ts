/** @format */
import location from "world-countries";
const countries = [
	{
		name: { common: "Bombali" },
		latlng: [9.238837199407863, -12.1148024],
		cca2: "SL1",
		region: "Northern Province",
	},
	{
		name: { common: "Bonthe" },
		latlng: [7.529276599394233, -12.513186599999997],
		cca2: "SL2",
		region: "Southern Province",
	},
	{
		name: { common: "Falaba" },
		latlng: [-11.766667, -13.216667],
		cca2: "SL3",
		region: "Northern Province",
	},
	{
		name: { common: "Kailahun" },
		latlng: [-10.573333, -8.279722],
		cca2: "SL4",
		region: "Eastern Province",
	},
	{
		name: { common: "Kambia" },
		latlng: [9.124684599404596, -12.9189134],
		cca2: "SL5",
		region: "Northern Province",
	},
	{
		name: { common: "Karene" },
		latlng: [13.277103, -8.893048],
		cca2: "SL6",
		region: "North West Province",
	},
	{
		name: { common: "Kenema" },
		latlng: [7.887085299390817, -11.1888166],
		cca2: "SL7",
		region: "Eastern Province",
	},
	{
		name: { common: "Koinadugu" },
		latlng: [9.37274539941211, -11.3253109],
		cca2: "SL9",
		region: "Northern Province",
	},
	{
		name: { common: "Kolahun" },
		latlng: [-11.018056, -9.010417],
		cca2: "SL0",
		region: "Northern Province",
	},
	{
		name: { common: "Kono" },
		latlng: [8.686888299395179, -10.919445399999999],
		cca2: "SLL",
		region: "Eastern Province",
	},
	{
		name: { common: "Moyamba" },
		latlng: [8.159152999390434, -12.4314374],
		cca2: "SLM",
		region: "Southern Province",
	},
	{
		name: { common: "Port Loko" },
		latlng: [8.764375399396483, -12.781955799999999],
		cca2: "SLP",
		region: "Northern Province",
	},
	{
		name: { common: "Pujehun" },
		latlng: [7.357197599397046, -11.7228832],
		cca2: "SL01",
		region: "Southern Province",
	},
	{
		name: { common: "Tonkolili" },
		latlng: [7.357197599397046, -11.7228832],
		cca2: "SL02",
		region: "Northern Province",
	},
	{
		name: { common: "Western Area Rural" },
		latlng: [8.307455199391034, -13.087732399999998],
		cca2: "SL03",
		region: "Western Area",
	},
	{
		name: { common: "Western Area Urban" },
		latlng: [8.459448399392246, -13.231758099999999],
		cca2: "SL04",
		region: "Western Area",
	},
];
const formattedCountries = countries.map((country) => ({
	value: country.cca2,
	label: country.name.common,
	latlng: country.latlng,
	region: country.region,
}));

const useCountries = () => {
	const getAll = () => formattedCountries;

	const getByValue = (value: string) => {
		return formattedCountries.find((item) => item.value === value);
	};

	return {
		getAll,
		getByValue,
	};
};

export default useCountries;
