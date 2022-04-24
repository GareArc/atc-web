import { Button, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { ItemForm } from "../../../components/ItemForm";
import { parseNumberHelper } from "../../../utils/validations";

/**
 * 
 * @param {{ 
 * order: import("../../../../../models/Order").IOrder; 
 * setOrder: React.Dispatch<React.SetStateAction<import("../../../../../models/Order").IOrder>>
 * }} props 
 */
export const NewItemTab = (props) => {
  const { order, setOrder } = props;
  const addItem = (item) => {
    const items = order.items;
    items.push(item);
    setOrder(o => ({ ...o, items: items }));
  }

  return (
    <>
      {/* <div>{JSON.stringify(item)}</div> */}
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
        <ItemForm order={order} type="AddPage" onSubmit={addItem}/>
      </Container>
    </>
  )
}