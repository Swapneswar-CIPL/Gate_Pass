import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField2 = styled((props: any) => <TextField {...props}  inputProps={{
  autocomplete: 'new-password',
  form: {
    autocomplete: 'off',
  },
												style: {
                          height:"1px", width: "300px"
												},
										}} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
    
  },
  '& .MuiOutlinedInput-root': {
    height: '30px !important',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
  


}));

export default CustomTextField2;
