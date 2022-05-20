import React from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Home() {
    return (
        <div className="container">

            <h1>Home</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body2" color="text.secondary" style={{"paddingBottom": "50px"}}>
                        <Button  href="/identify_shortest_path" type="submit" variant="contained" style={{"marginRight": "50px"}}>Shortest Path</Button>
                        <Button href="/eight_queens" type="submit" variant="contained">EightQueens</Button>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            
        </div>
    )
}

export default Home