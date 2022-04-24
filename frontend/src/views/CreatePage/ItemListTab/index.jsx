import { Avatar, Container, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material";
import { Delete, ShoppingBag, Edit, FileCopy } from "@mui/icons-material";
import uuid from "react-uuid";
import { useEffect, useState } from "react";
import { scrollToBottom } from "../../../utils/dom";
import { ItemForm } from "../../../components/ItemForm";

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
  const [selectedEdit, setSelectedEdit] = useState(null);

  const handleOpen = (item) => {
    setSelectedEdit(item);
    setOpenEdit(true);
  }

  const handleClose = () => {
    setOpenEdit(false);
    setSelectedEdit(null);
  }

  const handleEdit = (selected, item) => {
    setOrder(o => ({
      ...o,
      items: o.items.map(i =>
        i === selected ? item : i
      )
    }));
    handleClose();
  }

  const deleteItem = (item) => {
    const items = order.items.filter(i => i !== item);
    setOrder(o => ({ ...o, items: items }));
  }

  const handleDuplicate = (item) => {
    setOrder(o => ({ ...o, items: o.items.concat(Object.assign({}, item)) }));
    scrollToBottom();
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

  return (
    <>
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
                <IconButton edge="end" onClick={() => handleDuplicate(item)}>
                  <FileCopy />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
      <Dialog
        open={openEdit}
        onClose={handleClose}
      >
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <ItemForm order={order} onSubmit={handleEdit} item={selectedEdit} type="ListPage" />
        </DialogContent>
      </Dialog>
    </>
  )
}