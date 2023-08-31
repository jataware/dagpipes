import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import { scenarios } from './constants';
import clsx from 'clsx';

/**
 *
 **/
export function CheckboxLabels({labels, className=''}) {
  return (
    <FormGroup className={clsx(["nodrag", className])}>
      {labels.map(label => (
        <FormControlLabel
          control={<Checkbox
                     sx={{
                       color: pink[800],
                       '&.Mui-checked': {
                         color: pink[600],
                       },
                     }}
                   />}
          label={label}
        />
      ))}
    </FormGroup>
  );
}

export default () => {
  return (
    <CheckboxLabels labels={scenarios} />
  );
};
