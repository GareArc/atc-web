import { Avatar, Button, Collapse, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { ExpandLess, ExpandMore, ShoppingBag } from "@mui/icons-material";
import uuid from "react-uuid";
import { Box } from "@mui/system";
import { markTransfer } from "../../../api/requests/order";
import { parseNumberHelper } from "../../../utils/validations";

/**
 * 
 * @param {{
 * selected: import("../../../api/models/OrderResponse").IOrderResponse;
 * }} props  
 */
export const OrderDialog = (props) => {
  const { selected, onTransfer } = props;
  const [openBasic, setOpenBaisc] = useState(false);
  const [openAll, setOpenAll] = useState(false);
  const [openT1, setOpenT1] = useState(false);
  const [openT2, setOpenT2] = useState(false);

  const handleTransferBtnClick = (code) => {
    markTransfer(selected._id, code)
      .then(() => onTransfer())
      .catch(e => console.log(e));
  }

  /**
   * @param {import("../../../api/models/OrderResponse").IItemResponse} item 
   * @returns {boolean}
   */
  const inAllList = (item) => {
    return item.type === "All" || (item.type === "Ratio" && parseNumberHelper(item.ratio.self.$numberDecimal)  * parseNumberHelper(item.ratio.target1.$numberDecimal) * parseNumberHelper(item.ratio.target2.$numberDecimal) !== 0);
  }

  /**
   * @param {import("../../../api/models/OrderResponse").IItemResponse} item 
   * @param {import("../../../api/models/OrderResponse").IOrderResponse} order
   * @returns {boolean}
   */
  const inTarget1List = (order, item) => {
    return belongToTarget(order, item, 1) || (item.type === "Ratio" && parseNumberHelper(item.ratio.target1.$numberDecimal) !== 0);
  }

  /**
   * @param {import("../../../api/models/OrderResponse").IItemResponse} item 
   * @param {import("../../../api/models/OrderResponse").IOrderResponse} order
   * @returns {boolean}
   */
  const inTarget2List = (order, item) => {
    return belongToTarget(order, item, 2) || (item.type === "Ratio" && parseNumberHelper(item.ratio.target2.$numberDecimal) !== 0);
  }

  /**
   * @param {import("../../../api/models/OrderResponse").IOrderResponse} order 
   * @param {import("../../../api/models/OrderResponse").IItemResponse} item 
   */
  const belongToTarget = (order, item, target) => {
    if (item.type === "Shared") {
      if (target === 1) {
        if (item.shareType === "T1T2" || item.shareType === "WithT1") return true;
      }
      else {
        if (item.shareType === "T1T2" || item.shareType === "WithT2") return true;
      }
    }
    else if (item.type === "Individual") {
      if (target === 1) {
        if (item.target === order.basicInfo.target1) return true;
      }
      else {
        if (item.target === order.basicInfo.target2) return true;
      }
    }
    return false;
  }
  return (
    <div>
      {selected !== null && (
        <Container
          maxWidth={false}
          sx={{
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            padding: '0 !important',
            bgcolor: 'white',
            minHeight: 'fit-content',
            minWidth: '50vw',
          }}
        >
          <Container
            maxWidth={false}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 !important'
            }}
          >
            <Paper sx={{ height: '100%', overflow: 'auto', width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  mt: '2%',
                  mb: '2%'
                }}
              >
                <Button
                  disabled={selected.transferT1}
                  color="primary"
                  variant="contained"
                  onClick={() => handleTransferBtnClick(1)}
                >
                  {`${selected.basicInfo.target1}??????`}
                </Button>
                <Button
                  disabled={selected.transferT2}
                  color="primary"
                  variant="contained"
                  onClick={() => handleTransferBtnClick(2)}
                >
                  {`${selected.basicInfo.target2}??????`}
                </Button>
              </Box>
              <List>
                <ListItem>
                  <ListItemText primary={`${selected.basicInfo.target1}??????: $${selected.target1Total}`} />
                  <ListItemText primary={`${selected.basicInfo.target2}??????: $${selected.target2Total}`} />
                </ListItem>
                {/* Basic info */}
                <ListItem button onClick={() => setOpenBaisc(!openBasic)} sx={{ minWidth: '300px' }}>
                  <ListItemText primary="????????????" />
                  {openBasic ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openBasic} timeout="auto" unmountOnExit>
                  <List component="div">
                    <ListItem>
                      <ListItemText primary={`????????????: ${new Date(selected.date).toISOString().slice(0, 10)}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`UUID: ${selected._id}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`??????: $${selected.basicInfo.electric}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`??????: $${selected.basicInfo.internet}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Amazon???: $${selected.basicInfo.amz}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`??????: $${selected.basicInfo.other}`} />
                    </ListItem>

                  </List>
                </Collapse>
                {/* All */}
                <ListItem button onClick={() => setOpenAll(!openAll)} sx={{ minWidth: '300px' }}>
                  <ListItemText primary="????????????" />
                  {openAll ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openAll} timeout="auto" unmountOnExit>
                  <List component="div">
                    {selected.items.map(item => inAllList(item) && (
                      <ListItem
                        key={uuid()}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <ShoppingBag />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.title}
                          secondary={
                            `??????: $${item.price} ??????: ${item.quantity} ${item.isTaxed ? "??????" : "?????????"}`
                          }
                        />
                        <ListItemText
                          primary="??????"
                          secondary={item.type === "Ratio" ? `?????????${item.ratio.target1.$numberDecimal}:${item.ratio.target2.$numberDecimal}:${item.ratio.self.$numberDecimal}` : ""}
                          sx={{ ml: '15px' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
                {/* Target 1 */}
                <ListItem button onClick={() => setOpenT1(!openT1)} sx={{ minWidth: '300px' }}>
                  <ListItemText primary={`${selected.basicInfo.target1}??????`} />
                  {openT1 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openT1} timeout="auto" unmountOnExit>
                  <List component="div">
                    {selected.items.map(item => inTarget1List(selected, item) && (
                      <ListItem
                        key={uuid()}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <ShoppingBag />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.title}
                          secondary={
                            `??????: $${item.price} ??????: ${item.quantity} ${item.isTaxed ? "??????" : "?????????"}`
                          }
                        />
                        <ListItemText
                          secondary={item.type === "Shared" ? item.shareTypeDesc : item.type === "Ratio" ? <>????????? <strong>{item.ratio.target1.$numberDecimal}</strong>{`:${item.ratio.target2.$numberDecimal}:${item.ratio.self.$numberDecimal}`}</> : item.target}
                          sx={{ ml: '15px' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
                {/* Target 2 */}
                <ListItem button onClick={() => setOpenT2(!openT2)} sx={{ minWidth: '300px' }}>
                  <ListItemText primary={`${selected.basicInfo.target2}??????`} />
                  {openT1 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openT2} timeout="auto" unmountOnExit>
                  <List component="div">
                    {selected.items.map(item => inTarget2List(selected, item) && (
                      <ListItem
                        key={uuid()}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <ShoppingBag />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.title}
                          secondary={
                            `??????: $${item.price} ??????: ${item.quantity} ${item.isTaxed ? "??????" : "?????????"}`
                          }
                        />
                        <ListItemText
                          secondary={item.type === "Shared" ? item.shareTypeDesc : item.type === "Ratio" ? <>????????? <strong>{item.ratio.target2.$numberDecimal}</strong>{`:${item.ratio.target1.$numberDecimal}:${item.ratio.self.$numberDecimal}`}</> : item.target}
                          sx={{ ml: '15px' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </List>
            </Paper>

          </Container>
        </Container>
      )}
    </div>
  )
}