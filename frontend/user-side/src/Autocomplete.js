import React from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
option: {
    fontSize: 15,
    '& > span': {
    marginRight: 10,
    fontSize: 18,
    },
},
});

const CitySelect = (props) => {
    const classes = useStyles();

    return (
        <Autocomplete
        style={{ width: props.width || 300 }}
        options={props.options}
        classes={{
            option: classes.option,
        }}
        value={props.value || null}
        autoHighlight
        autoSelect
        getOptionLabel={(option) => option}
        renderOption={(option) => option}
        name={props.name}
        onChange={props.change}
        renderInput={(params) => (
            <TextField
            {...params}
            label={props.label}
            value={props.value || null}
            name={props.name}
            variant="outlined"
            inputProps={{
                ...params.inputProps,
                autoComplete: 'off',
            }}          
            />
        )}
        />
    )
};

export default CitySelect;


