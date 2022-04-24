import { Avatar, Button, Collapse, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { ExpandLess, ExpandMore, ShoppingBag } from "@mui/icons-material";
import uuid from "react-uuid";
import { Box } from "@mui/system";
import { markTransfer } from "../../../api/requests/order";

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
   * @param {import("../../../api/models/OrderResponse").IOrderResponse} order 
   * @param {import("../../../api/models/OrderResponse").IItemResponse} item 
   */
  const belongToT = (order, item, target) => {
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
                  {`${selected.basicInfo.target1}已转`}
                </Button>
                <Button
                  disabled={selected.transferT2}
                  color="primary"
                  variant="contained"
                  onClick={() => handleTransferBtnClick(2)}
                >
                  {`${selected.basicInfo.target2}已转`}
                </Button>
              </Box>
              <List>
                <ListItem>
                  <ListItemText primary={`${selected.basicInfo.target1}总计: $${selected.target1Total}`} />
                  <ListItemText primary={`${selected.basicInfo.target2}总计: $${selected.target2Total}`} />
                </ListItem>
                {/* Basic info */}
                <ListItem button onClick={() => setOpenBaisc(!openBasic)} sx={{ minWidth: '300px' }}>
                  <ListItemText primary="基本信息" />
                  {openBasic ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openBasic} timeout="auto" unmountOnExit>
                  <List component="div">
                    <ListItem>
                      <ListItemText primary={`提交时间: ${new Date(selected.date).toISOString().slice(0, 10)}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`UUID: ${selected._id}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`电费: $${selected.basicInfo.electric}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`网费: $${selected.basicInfo.internet}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Amazon费: $${selected.basicInfo.amz}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`其他: $${selected.basicInfo.other}`} />
                    </ListItem>

                  </List>
                </Collapse>
                {/* All */}
                <ListItem button onClick={() => setOpenAll(!openAll)} sx={{ minWidth: '300px' }}>
                  <ListItemText primary="三人部分" />
                  {openAll ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openAll} timeout="auto" unmountOnExit>
                  <List component="div">
                    {selected.items.map(item => item.type === "All" && (
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
                            `价格: $${item.price} 数量: ${item.quantity} ${item.isTaxed ? "收税" : "不收税"}`
                          }
                        />
                        <ListItemText
                          primary="三人"
                          sx={{ ml: '15px' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
                {/* Target 1 */}
                <ListItem button onClick={() => setOpenT1(!openT1)} sx={{ minWidth: '300px' }}>
                  <ListItemText primary={`${selected.basicInfo.target1}部分`} />
                  {openT1 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openT1} timeout="auto" unmountOnExit>
                  <List component="div">
                    {selected.items.map(item => belongToT(selected, item, 1) && (
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
                            `价格: $${item.price} 数量: ${item.quantity} ${item.isTaxed ? "收税" : "不收税"}`
                          }
                        />
                        <ListItemText
                          primary={item.type === "Shared" ? item.shareTypeDesc : item.target}
                          sx={{ ml: '15px' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
                {/* Target 2 */}
                <ListItem button onClick={() => setOpenT2(!openT2)} sx={{ minWidth: '300px' }}>
                  <ListItemText primary={`${selected.basicInfo.target2}部分`} />
                  {openT1 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openT2} timeout="auto" unmountOnExit>
                  <List component="div">
                    {selected.items.map(item => belongToT(selected, item, 2) && (
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
                            `价格: $${item.price} 数量: ${item.quantity} ${item.isTaxed ? "收税" : "不收税"}`
                          }
                        />
                        <ListItemText
                          primary={item.type === "Shared" ? item.shareTypeDesc : item.target}
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