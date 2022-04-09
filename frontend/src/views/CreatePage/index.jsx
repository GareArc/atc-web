import { useState } from "react";
import { AppBar, Tab, Tabs, Typography } from "@mui/material";
import { TabPanel } from "../../components/TabPanel";
import { BasicInfoPage } from "./BaiscInfoTab";
import { NewItemTab } from "./NewItemTab";
import { ItemListTab } from "./ItemListTab";
import { SubmitTab } from "./SubmitTab";

/** @type {import("../../../../models/Order").IOrder} */
const initOrder = {
  /** @type {import("../../../../models/Order").IBasicInfo} */
  basicInfo: {
    target1: "Gareth",
    target2: "Charlie",
    amz: 0,
    electric: 0,
    internet: 0,
    other: 0
  },
  finished: false,
  /** @type {import("../../../../models/Order").IItem[]} */
  items: []
};
export const CreatePage = () => {
  const [tabNum, setTabNum] = useState(0);
  const [order, setOrder] = useState(initOrder);

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: 'white', border: '1px solid #1976d2'}}>
        <Tabs value={tabNum}
          onChange={(e, val) => setTabNum(val)}>
          <Tab label="基本信息" />
          <Tab label="新物品" />
          <Tab label="已添加" />
          <Tab label="提交" />
        </Tabs>
      </AppBar>

      <TabPanel index={tabNum} value={0}>
        <BasicInfoPage order={ order } setOrder={ setOrder } />
      </TabPanel>
      <TabPanel index={tabNum} value={1}>
        <NewItemTab order={ order } setOrder={ setOrder }/>
      </TabPanel>
      <TabPanel index={tabNum} value={2}>
        <ItemListTab order={ order } setOrder={ setOrder }/>
      </TabPanel>
      <TabPanel index={tabNum} value={3}>
        <SubmitTab order={order} setOrder={setOrder} initOrder={ initOrder } />
      </TabPanel>

      {/* <div>{JSON.stringify(order)}</div> */}
    </div>
  )
}