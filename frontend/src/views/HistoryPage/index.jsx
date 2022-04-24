import { Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllOrders, markAsFinished } from "../../api/requests/order";
import { OrderDialog } from "./OrderDialog";
import { PendingActions, CreditScore } from "@mui/icons-material";
import uuid from "react-uuid";

/** @type {import("../../api/models/OrderResponse").IOrderResponse[]} */
const initOrders = [];
/** @type {import("../../api/models/OrderResponse").IOrderResponse} */
const initSelected = null;

export const HistoryPage = () => {
  const [loading, setLoaing] = useState(true);
  const [orders, setOrders] = useState(initOrders);
  const [selected, setSelected] = useState(initSelected);
  const [open, setOpen] = useState(false);

  const fetchOrders = () => {
    getAllOrders()
      .then(result => {
        setOrders(result);
        setLoaing(false);
      })
      .catch(err => console.log(err));
  }

  const handleCheck = (order) => {
    setSelected(order);
    setOpen(true);
  }

  /**
   * @param {import("../../api/models/OrderResponse").IOrderResponse} order 
   */
  const handleFinished = (order) => {
    markAsFinished(order._id)
      .then(() => {
        setLoaing(true);
        setOpen(false);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (loading) {
      fetchOrders();
    }
  }, [loading])

  return (
    <div>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          padding: '3% !important',
          bgcolor: 'white',
          minHeight: '50vh'
        }}>
        {loading ? (<div>Loading...</div>) :
          (
            <Container
              maxWidth={false}
              sx={{
                display: 'flex',
                flexWrap: 'wrap'
              }}
            >
              {orders.map(order => (
                <Card
                  key={uuid()}
                  variant="elevation"
                  sx={{
                    height: 'fit-content',
                    mr: '20px',
                    bgcolor: order.finished ? '#a8d0f7' : 'white',
                    flex: '0 0 220px',
                    overflow: "hidden",
                    mb: '25px'
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {`账单 ${new Date(order.date).toISOString().slice(0, 10)}`}
                    </Typography>
                    <Typography variant="body2">
                      {order._id}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'space-evenly',
                        mt: '2%'
                      }}
                    >
                      {!order.transferT1 ? (<div><PendingActions color="warning"/>{`${order.basicInfo.target1}`}</div>) : (<div><CreditScore color="success"/></div>) }
                      {!order.transferT2 ? (<div><PendingActions color="warning"/>{`${order.basicInfo.target2}`}</div>) : (<div><CreditScore color="success"/></div>) }
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button color="primary" onClick={() => handleCheck(order)}>
                      Check
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Container>
          )
        }
        {selected !== null && (
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="fit-content"
          >
            <DialogTitle>{`账单 ${selected._id}`}</DialogTitle>
            <OrderDialog selected={selected} onTransfer={() => { setLoaing(true); setOpen(false); }} />
            <DialogActions>
              <Button disabled={selected.finished} color="warning" onClick={() => handleFinished(selected)}>
                Finished
              </Button>
              <Button color="primary" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </div>
  )
}