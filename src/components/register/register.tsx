import React from 'react'
import { Container, Typography, Grid, Paper } from '@material-ui/core'
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import { makeStyles } from '@material-ui/core/styles';
import ItemOverview from './itemOverview/itemOverview';
import CustomerInformation from './customerInformation/customerInformation';
import DeliveryOptions from './deliveryOptions/deliveryOptions';
import PaymentOptions from './paymentOptions/paymentOptions';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    wrapper: {
        minHeight: '100vh',
        height: '100%',
        paddingBottom: '10rem'
    },
    paper: {
        height: '100%',
        padding: theme.spacing(3),
        color: theme.palette.text.secondary,
    },
    title: {
        padding: theme.spacing(2)
    }
  }));

export default function Register() {
    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.wrapper}>
            <Typography variant="h3" className={classes.title} component="h1">
                Checkout <ShoppingCartRoundedIcon fontSize="large" />
            </Typography>
            <div className={classes.root}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <ItemOverview />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7}>
                    <Paper className={classes.paper}>
                        <CustomerInformation />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <Paper className={classes.paper}>
                        <DeliveryOptions />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <PaymentOptions />
                      </Paper>
                  </Grid>
                </Grid>
            </div>
        </Container>
    )
}