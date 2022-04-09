import { Avatar, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@mui/material";
import { Delete, ShoppingBag } from "@mui/icons-material";
import uuid from "react-uuid";
/**
 * 
 * @param {{ 
 * order: import("../../../../../models/Order").IOrder; 
 * setOrder: React.Dispatch<React.SetStateAction<import("../../../../../models/Order").IOrder>>
 * }} props 
 */
export const ItemListTab = (props) => {
  const { order, setOrder } = props;
  const deleteItem = (item) => {
    const items = order.items.filter(i => i !== item);
    setOrder(o => ({ ...o, items: items }));
  }

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
                  `价格: $${item.price} 数量: ${item.quantity} ${item.isTaxed ? "收税" : "不收税"}`
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => deleteItem(item)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  )
}