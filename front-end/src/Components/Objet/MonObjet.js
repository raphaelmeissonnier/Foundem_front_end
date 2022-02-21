import React from "react";
import {Box, Paper} from '@mui/material';

const MonObjet  = () => {

return (
<div style = {{backgroundColor : '#aad7ef', marginLeft: '100'}}>
<Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > :not(style)': {
          m: 1,
          width: 1000,
          height: 500,

        },
      }}
    >

      <Paper elevation={3} style = {{boxShadow: 1, borderRadius: 30,}}>


      </Paper>
    </Box>
</div>
)
}

export default MonObjet;