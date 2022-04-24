import { Button, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Switch, TextField } from "@mui/material";
import { useState } from 'react';
import { parseNumberHelper } from "../../utils/validations";

/** @type {import("../../../../models/Order").IItem} */
export const initItem = {
  title: "物品",
  price: 0,
  quantity: 1,
  isTaxed: false,
  type: "All",
  shareType: "WithT1",
  target: "Charlie"
}

const parseHelper = (e) => {
  return parseNumberHelper(e.target.value);
}

/**
 * 
 * @param {{
 * item: import("../../../../models/Order").IItem;
 * order: import("../../../../models/Order").IOrder;
 * type: "AddPage" | "ListPage";
 * onSubmit: (item: import("../../../../models/Order").IItem) => void | 
 * (item: import("../../../../models/Order").IItem, 
 * newItem: import("../../../../models/Order").IItem) => void;
 * }} props 
 * @returns 
 */
export const ItemForm = (props) => {
  const { order, type, onSubmit, item } = props;
  const [showSuccess, setShowSuccess] = useState(false);
  const [itemState, setItemState] = useState(item || initItem);

  const onClickSubmit = () => {
    if (showSuccess) return;
    setShowSuccess(true);

    if (type === "ListPage") {
      onSubmit(item, itemState);
      return;
    }
    else if (type === "AddPage") {
      onSubmit(itemState);
    };
    setTimeout(() => setShowSuccess(false), 500);
  }

  const typeConfig = () => {
    if (type === "AddPage") {
      return {
        submitBtn: {
          submitBtnTextDefault: "添加",
          submitBtnTextClick: "已添加✔"
        }
      }
    }
    else if (type === "ListPage") {
      return {
        submitBtn: {
          submitBtnTextDefault: "修改",
          submitBtnTextClick: "已修改✔"
        }
      }
    }
  }

  return (
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
          minWidth: '400px',
          alignItems: 'flex-start'
        }}
      >
        <TextField
          error={itemState.title === ""}
          helperText={itemState.title === "" ? "Empty" : ""}
          label="物品描述"
          sx={{
            m: '5%',
            width: '300px'
          }}
          type="text"
          defaultValue={itemState.title}
          onChange={e => setItemState(i => ({ ...i, title: e.target.value }))}
        />
        <FormControl
          component="fieldset"
          sx={{
            m: '5%'
          }}
        >
          <FormLabel component="legend">选择类型</FormLabel>
          <RadioGroup row value={itemState.type} onChange={e => setItemState(i => ({ ...i, type: e.target.value }))}>
            <FormControlLabel value="All" control={<Radio />} label="三人" />
            <FormControlLabel value="Shared" control={<Radio />} label="双人" />
            <FormControlLabel value="Individual" control={<Radio />} label="个人" />
          </RadioGroup>
        </FormControl>
        {
          itemState.type === "Shared" && (
            <FormControl
              component="fieldset"
              sx={{
                m: '5%'
              }}
            >
              <FormLabel component="legend">具体是指</FormLabel>
              <RadioGroup value={itemState.shareType} onChange={e => setItemState(i => ({ ...i, shareType: e.target.value }))}>
                <FormControlLabel value="WithT1" control={<Radio />} label={`我和${order.basicInfo.target1}`} />
                <FormControlLabel value="WithT2" control={<Radio />} label={`我和${order.basicInfo.target2}`} />
                <FormControlLabel value="T1T2" control={<Radio />} label={`${order.basicInfo.target1}和${order.basicInfo.target2}`} />
              </RadioGroup>
            </FormControl>
          )
        }
        {
          itemState.type === "Individual" && (
            <FormControl
              component="fieldset"
              sx={{
                m: '5%'
              }}
            >
              <FormLabel component="legend">选择对象</FormLabel>
              <RadioGroup value={itemState.target} onChange={e => setItemState(i => ({ ...i, target: e.target.value }))}>
                <FormControlLabel value={order.basicInfo.target1} control={<Radio />} label={order.basicInfo.target1} />
                <FormControlLabel value={order.basicInfo.target2} control={<Radio />} label={order.basicInfo.target2} />
              </RadioGroup>
            </FormControl>
          )
        }
        <TextField
          error={itemState.price === null}
          helperText={itemState.price === null ? "Invalid Number" : ""}
          label="物品价格"
          sx={{ m: '5%', width: '300px' }}
          type="number"
          defaultValue={itemState.price}
          inputProps={{ min: "0", step: "0.01" }}
          onChange={e => setItemState(i => ({ ...i, price: parseHelper(e) }))}
        />
        <TextField
          error={itemState.quantity === null}
          helperText={itemState.quantity === null ? "Invalid Number" : ""}
          label="物品数量"
          sx={{ m: '5%', width: '300px' }}
          type="number"
          defaultValue={itemState.quantity}
          inputProps={{ min: "1", step: "1" }}
          onChange={e => setItemState(i => ({ ...i, quantity: parseHelper(e) }))}
        />
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={itemState.isTaxed}
                onChange={e => setItemState(i => ({ ...i, isTaxed: e.target.checked }))}
              />
            }
            label="是否收税"
            labelPlacement="start"
            sx={{ flexDirection: 'row', m: '5%' }}
          />
        </FormControl>
        <Container
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: '3%',
              width: '80%'
            }}
            onClick={onClickSubmit}
          >
            {showSuccess ? typeConfig().submitBtn.submitBtnTextClick : typeConfig().submitBtn.submitBtnTextDefault}
          </Button>
        </Container>
      </Container>
    </Container>
  )
}