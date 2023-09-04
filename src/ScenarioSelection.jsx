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
    <FormGroup className={clsx([className])}>
      {labels.map(label => (
        <FormControlLabel
          key={label}
          control={<Checkbox
                     disableRipple
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

export default (props) => {
  return (
    <CheckboxLabels labels={scenarios} {...props} />
  );
};
