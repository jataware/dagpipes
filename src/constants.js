
export const data = [
  'pr (precipitation)',
  'tas (mean surface air temperature)',
  'tasmax (max surface air temperature)',
  'population',
  'land use'
];

export const scenarios = [
  'ssp126',
  'ssp245',
  'ssp370',
  'ssp585'
];

export const operations = [
  'load', // no inputs. setting is what data to load
  'threshold', // 1 input. setting is threshold value (number), and threshold type (one of greater_than, greater_than_or_equal, less_than, less_than_or_equal, equal, not_equal)
  'multiply', // : 2 inputs, no settings
  'country_split', // 1 input , setting is which countries by name, for example I've been using ['China', 'India', 'United States', 'Canada', 'Mexico']
  'sum', // 1 input, setting is which dimensions to sum over, by name (possible dimensions will probably just be lat, lon, time, scenario, realization)
'save' //  1 input, no outputs, setting is the filename to save to. Possibly don't need this--for the MVP I could probably just save the last node in the list of nodes
];
