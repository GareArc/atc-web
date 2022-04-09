import { Button, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Switch, TextField } from "@mui/material";
import { useState } from "react";

/** @type {import("../../../../../models/Order").IItem} */
const initItem = {
  title: "物品",
  price: 0,
  quantity: 1,
  isTaxed: false,
  type: "All",
  shareType: "WithT1",
  target: "Charlie"
}
const parseHelper = (e) => {
  if (Number.isNaN(parseFloat(e.target.value))) return null;
  return parseFloat(e.target.value);
}
/**
 * 
 * @param {{ 
 * order: import("../../../../../models/Order").IOrder; 
 * setOrder: React.Dispatch<React.SetStateAction<import("../../../../../models/Order").IOrder>>
 * }} props 
 */
export const NewItemTab = (props) => {
  const { order, setOrder } = props;
  const [item, setItem] = useState(initItem);
  const [showSuccess, setShowSuccess] = useState(false);
  const addItem = () => {
    if (showSuccess) return;
    setShowSuccess(true);
    const items = order.items;
    items.push(item);
    setOrder(o => ({ ...o, items: items }));
    setTimeout(() => setShowSuccess(false), 500);
  }

  return (
    <div>
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
        <Container
          maxWidth={false}
          sx={{
            paddingTop: '3%',
            paddingBottom: '3%',
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <TextField
            error={ item.title === "" }
            helperText={item.title === "" ? "Empty" : ""}
            label="物品描述"
            sx={{
              m: '5%',
              width: '300px'
            }}
            type="text"
            defaultValue={item.title}
            onChange={e => setItem(i => ({...i, title: e.target.value}))}
          />
          <FormControl
            component="fieldset"
            sx={{
              m: '5%'
            }}
          >
            <FormLabel component="legend">选择类型</FormLabel>
            <RadioGroup row value={item.type} onChange={e => setItem(i => ({...i, type: e.target.value}))}>
              <FormControlLabel value="All" control={<Radio />} label="三人" />
              <FormControlLabel value="Shared" control={<Radio />} label="双人" />
              <FormControlLabel value="Individual" control={<Radio />} label="个人"/>
            </RadioGroup>
          </FormControl>
          {
            item.type === "Shared" && (
            <FormControl
              component="fieldset"
              sx={{
                m: '5%'
              }}
            >
              <FormLabel component="legend">具体是指</FormLabel>
              <RadioGroup value={item.shareType} onChange={e => setItem(i => ({...i, shareType: e.target.value}))}>
                <FormControlLabel value="WithT1" control={<Radio />} label={`我和${order.basicInfo.target1}`} />
                <FormControlLabel value="WithT2" control={<Radio />} label={`我和${order.basicInfo.target2}`} />
                <FormControlLabel value="T1T2" control={<Radio />} label={`${order.basicInfo.target1}和${order.basicInfo.target2}`}/>
              </RadioGroup>
            </FormControl>
            )
          }
          {
            item.type === "Individual" && (
            <FormControl
              component="fieldset"
              sx={{
                m: '5%'
              }}
            >
              <FormLabel component="legend">选择对象</FormLabel>
              <RadioGroup value={item.target} onChange={e => setItem(i => ({...i, target: e.target.value}))}>
                <FormControlLabel value={order.basicInfo.target1} control={<Radio />} label={order.basicInfo.target1} />
                <FormControlLabel value={order.basicInfo.target2} control={<Radio />} label={order.basicInfo.target2} />
              </RadioGroup>
            </FormControl>
            )
          }
          <TextField
            error={item.price === null}
            helperText={item.price === null ? "Invalid Number" : ""}
            label="物品价格"
            sx={{ m: '5%', width: '300px'}}
            type="number"
            defaultValue={order.basicInfo.electric}
            inputProps={{ min: "0", step: "0.01" }}
            onChange={e => setItem(i => ({...i, price: parseHelper(e)}))}
          />
          <TextField
            error={item.quantity === null}
            helperText={item.quantity === null ? "Invalid Number" : ""}
            label="物品数量"
            sx={{ m: '5%', width: '300px'}}
            type="number"
            defaultValue={item.quantity}
            inputProps={{ min: "1", step: "1" }}
            onChange={e => setItem(i => ({...i, quantity: parseHelper(e)}))}
          />
          <FormControl>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={item.isTaxed}
                  onChange={e => setItem(i => ({ ...i, isTaxed: e.target.checked }))}
                />
              }
              label="是否收税"
              labelPlacement="start"
              sx={{ flexDirection: 'row', m: '5%'}}
            />
          </FormControl>
          <Container
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: '80%'
              }}
              onClick={addItem}
            >
              {showSuccess? "已添加✔" : "添加"}
            </Button>
          </Container>
        </Container>
      </Container>
    </div>
  )
}