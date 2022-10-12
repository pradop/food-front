import React, {useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { CircularProgress } from "@mui/material";
import {getNutrients} from '../services/api';
import {Nutrient} from '../interfaces';

interface NutrientsFinderProps {
  onChange: Function
}

const NutrientsFinder = ({onChange}: NutrientsFinderProps) => {
  const [nutrients, setNutrients] = useState<Nutrient[] | []>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const apiCall = async (search: string = '') => {
    const response = await getNutrients(search);
    setNutrients(response.data as Nutrient[])
  }
  
  useEffect(() => {
    apiCall()
  }, [])

  return (
    <Autocomplete
    multiple={true}
    className="md:w-96 w-full"
    onChange={(event: any, newValue: Nutrient[] | undefined) => {
      onChange(newValue)
    }}
    inputValue={inputValue}
    loading={loading}
    onInputChange={async (event, newInputValue) => {
      setLoading(true)
      try {
        setInputValue(newInputValue)
        await apiCall(newInputValue)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }}
    id="autocomplete"
    options={nutrients}
    isOptionEqualToValue={(option, value) => option.nutrient_id === value.nutrient_id}
    getOptionLabel={ (option: string | Nutrient) => (option as Nutrient).name}
    renderInput={(params) => <TextField {...params} label="Nutrients" size='small' InputProps={{
      ...params.InputProps,
      endAdornment: (
        <React.Fragment>
          {loading ? (
            <CircularProgress size={20}/>
          ) : null}
          {params.InputProps.endAdornment}
        </React.Fragment>
      ),
    }}/>}
  />
  )
}

export default NutrientsFinder;