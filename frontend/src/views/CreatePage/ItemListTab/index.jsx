import { Avatar, Button, Container, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Radio, RadioGroup, Switch, TextField, Typography } from "@mui/material";
import { Delete, ShoppingBag, Edit } from "@mui/icons-material";
import uuid from "react-uuid";
import { useEffect, useState } from "react";
import { parseNumberHelper } from "../../../utils/validations";
import { initItem } from "../NewItemTab";

/**
 * 
 * @param {{ 
 * order: import("../../../../../models/Order").IOrder; 
 * setOrder: React.Dispatch<React.SetStateAction<import("../../../../../models/Order").IOrder>>
 * }} props 
 */
export const ItemListTab = (props) => {
  const { order, setOrder } = props;
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState(initItem);
  const [editInfo, setEditInfo] = useState(initItem);

  const handleOpen = (item) => {
    setSelectedEdit(item);
    setOpenEdit(true);
  }

  const handleClose = () => {
    setOpenEdit(false);
    setSelectedEdit(initItem);
  }

  const handleEdit = () => {
    setOrder(o => ({
      ...o,
      items: o.items.map(i =>
        i === selectedEdit ? editInfo : i
      )
    }));
    handleClose();
  }

  const deleteItem = (item) => {
    const items = order.items.filter(i => i !== item);
    setOrder(o => ({ ...o, items: items }));
  }

  /** Get description of the item relation.
   * 
   * @param {import("../../../../../models/Order").IItem} item item object
   * @returns {string} description
   */
  const getRelationString = (item) => {
    if (item.type === "All") return "三人";
    else if (item.type === "Individual") return item.target;
    else {
      if (item.shareType === 'WithT1') {
        return `我和${order.basicInfo.target1}`;
      }
      if (item.shareType === 'WithT2') {
        return `我和${order.basicInfo.target2}`;
      }
      else {
        return `${order.basicInfo.target1}和${order.basicInfo.target2}`;
      }
    }
  }

  useEffect(() => {
    if (selectedEdit) {
      setEditInfo(Object.assign({}, selectedEdit));
    }
  }, [selectedEdit])

  return (
    <div>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 !important',
          bgcolor: 'white',
          minHeight: '50vh'
        }}
      >
        <List>
          {order.items.map(item => (
            <ListItem
              key={uuid()}
              sx={{
                minWidth: '400px',
                borderBottom: '1px solid #1976d2'
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <ShoppingBag />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                secondary={
                  <>
                    <Typography gutterBottom component="p">
                      {`价格: $${item.price} 数量: ${item.quantity} ${item.isTaxed ? "收税" : "不收税"}`}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {getRelationString(item)}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => deleteItem(item)}>
                  <Delete />
                </IconButton>
                <IconButton edge="end" onClick={() => handleOpen(item)}>
                  <Edit />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
      <Dialog
        open={openEdit && editInfo !== null}
        onClose={handleClose}
      >
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <Container
            maxWidth={false}
            sx={{
              padding: '0 !important',
              bgcolor: 'white',
              minHeight: 'fit-content',
              width: 'max-content',
            }}
          >
            <Container
              maxWidth={false}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 'max-content',
                alignItems: 'flex-start'
              }}
            >
              <TextField
                error={editInfo.title === ""}
                helperText={editInfo.title === "" ? "Empty" : ""}
                label="物品描述"
                sx={{
                  marginTop: '5%',
                  width: '100%'
                }}
                type="text"
                defaultValue={selectedEdit.title}
                onChange={e => setEditInfo(s => ({ ...s, title: e.target.value }))}
              />
              <FormControl
                component="fieldset"
                sx={{
                  marginTop: '5%',
                  width: '100%'
                }}
              >
                <FormLabel component="legend">选择类型</FormLabel>
                <RadioGroup
                  row
                  value={editInfo.type}
                  onChange={e => setEditInfo(i => ({ ...i, type: e.target.value }))}
                >
                  <FormControlLabel value="All" control={<Radio />} label="三人" />
                  <FormControlLabel value="Shared" control={<Radio />} label="双人" />
                  <FormControlLabel value="Individual" control={<Radio />} label="个人" />
                </RadioGroup>
              </FormControl>
              {
                editInfo.type === "Shared" && (
                  <FormControl
                    component="fieldset"
                    sx={{
                      marginTop: '5%',
                      width: '100%'
                    }}
                  >
                    <FormLabel component="legend">具体是指</FormLabel>
                    <RadioGroup
                      defaultValue={editInfo.shareType}
                      onChange={e => setEditInfo(i => ({ ...i, shareType: e.target.value }))}
                    >
                      <FormControlLabel value="WithT1" control={<Radio />} label={`我和${order.basicInfo.target1}`} />
                      <FormControlLabel value="WithT2" control={<Radio />} label={`我和${order.basicInfo.target2}`} />
                      <FormControlLabel value="T1T2" control={<Radio />} label={`${order.basicInfo.target1}和${order.basicInfo.target2}`} />
                    </RadioGroup>
                  </FormControl>
                )
              }
              {
                editInfo.type === "Individual" && (
                  <FormControl
                    component="fieldset"
                    sx={{
                      marginTop: '5%',
                      width: '100%'
                    }}
                  >
                    <FormLabel component="legend">选择对象</FormLabel>
                    <RadioGroup defaultValue={editInfo.target} onChange={e => setEditInfo(i => ({ ...i, target: e.target.value }))}>
                      <FormControlLabel value={order.basicInfo.target1} control={<Radio />} label={order.basicInfo.target1} />
                      <FormControlLabel value={order.basicInfo.target2} control={<Radio />} label={order.basicInfo.target2} />
                    </RadioGroup>
                  </FormControl>
                )
              }
              <TextField
                error={editInfo.price === null}
                helperText={editInfo.price === null ? "Invalid Number" : ""}
                label="物品价格"
                sx={{ marginTop: '5%', width: '100%' }}
                type="number"
                defaultValue={editInfo.price}
                inputProps={{ min: "0", step: "0.01" }}
                onChange={e => setEditInfo(i => ({ ...i, price: parseNumberHelper(e.target.value) }))}
              />
              <TextField
                error={editInfo.quantity === null}
                helperText={editInfo.quantity === null ? "Invalid Number" : ""}
                label="物品数量"
                sx={{ marginTop: '5%', width: '100%' }}
                type="number"
                defaultValue={editInfo.quantity}
                inputProps={{ min: "1", step: "1" }}
                onChange={e => setEditInfo(i => ({ ...i, quantity: parseNumberHelper(e.target.value) }))}
              />
              <FormControl>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={editInfo.isTaxed}
                      onChange={e => setEditInfo(i => ({ ...i, isTaxed: e.target.checked }))}
                    />
                  }
                  label="是否收税"
                  labelPlacement="start"
                  sx={{ flexDirection: 'row', marginTop: '5%' }}
                />
              </FormControl>
              <Container
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: '8%'
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '80%'
                  }}
                  onClick={handleEdit}
                >
                  修改
                </Button>
              </Container>
            </Container>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  )
}