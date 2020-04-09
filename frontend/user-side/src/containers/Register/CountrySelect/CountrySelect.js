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

const CountrySelect = (props) => {
    const classes = useStyles();

    return (
        <Autocomplete
        id="country-select-demo"
        style={{ width: 300 }}
        options={cities}
        classes={{
            option: classes.option,
        }}
        
        autoHighlight
        getOptionLabel={(option) => option}
        renderOption={(option) => (
            <React.Fragment>
                {option}
            </React.Fragment>
        )}
        name='location'
        onChange={props.change}
        renderInput={(params) => (
            <TextField
            {...params}
            label="Miestas"
            name='location'
            variant="outlined"
            inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
            }}          
            />
        )}
    />
    )
};

export default CountrySelect;


const cities = [
    "Vilnius", 
    "Kaunas", 
    "Klaip\u0117da", 
    "Vijoliai", 
    "Pae\u017eerys",  
    "\u0160al\u010dininkai", 
    "Skuodas", 
    "Tel\u0161iai", 
    "Panev\u0117\u017eys", 
    "Ignalina", 
    "Palanga", 
    "\u0160irvintos", 
    "Visaginas", 
    "Var\u0117na", 
    "Rietavas", 
    "Raseiniai", 
    "Roki\u0161kis", 
    "\u0160iauliai", 
    "Kazl\u0173 R\u016bda", 
    "Ma\u017eeikiai", 
    "Kelm\u0117", 
    "Joni\u0161kis", 
    "Bir\u017eai", 
    "Bir\u0161tonas", 
    "Marijampol\u0117", 
    "Kupi\u0161kis", 
    "Radvili\u0161kis", 
    "Kretinga", 
    "Jurbarkas", 
    "Taurag\u0117", 
    "Kalvarija", 
    "Pag\u0117giai", 
    "Prienai", 
    "\u0160ven\u010dionys", 
    "Zarasai",  
    "Pasvalys", 
    "Lazdijai", 
    "Plung\u0117", 
    "K\u0117dainiai", 
    "\u0160ilut\u0117",        
    "Druskininkai", 
    "Nida", 
    "Jonava",      
    "Anyk\u0161\u010diai", 
    "\u0160ilal\u0117",   
    "Kai\u0161iadorys",  
    "Elektr\u0117nai",   
    "Mol\u0117tai",    
    "Pakruojis",     
    "Utena",      
    "Alytus",      
    "\u0160akiai",      
    "Akmen\u0117",     
    "Trakai",       
    "Vilkavi\u0161kis",      
    "Ukmerg\u0117"
]