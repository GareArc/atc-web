import { Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";

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
export const BasicInfoPage = (props) => {
  const { order, setOrder } = props;

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
        <Container
          maxWidth={false}
          sx={{
            maxWidth: '300px'
          }}
        >
          <FormControl fullWidth sx={{ m: '10%'}}>
            <InputLabel>对象1</InputLabel>
            <Select 
              error={order.basicInfo.target1 === order.basicInfo.target2}
              defaultValue={order.basicInfo.target1}
              label="对象1"
              sx={{ maxWidth: '200px'}}
              onChange={e => setOrder(o => ({ ...o, basicInfo: { ...o.basicInfo, target1: e.target.value } }))}
            >
              <MenuItem value="Gareth">Gareth</MenuItem>
              <MenuItem value="Charlie">Charlie</MenuItem>
              <MenuItem value="Ethan">Ethan</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ m: '10%'}}>
            <InputLabel>对象2</InputLabel>
            <Select 
              error={order.basicInfo.target1 === order.basicInfo.target2}
              defaultValue={order.basicInfo.target2}
              label="对象2"
              sx={{ maxWidth: '200px'}}
              onChange={e => setOrder(o => ({ ...o, basicInfo: { ...o.basicInfo, target2: e.target.value } }))}
            >
              <MenuItem value="Gareth">Gareth</MenuItem>
              <MenuItem value="Charlie">Charlie</MenuItem>
              <MenuItem value="Ethan">Ethan</MenuItem>
            </Select>
            <FormHelperText sx={{ color: "#d32f2f"}}>
              {order.basicInfo.target1 === order.basicInfo.target2 ? "Cannot be the same person" : ""}
            </FormHelperText>
          </FormControl>
        </Container>
        <Container
          maxWidth={false}
          sx={{
            maxWidth: '300px',
            paddingTop: '3%',
            paddingBottom: '3%'
          }}
        >
          <TextField
            error={order.basicInfo.electric === null}
            helperText={order.basicInfo.electric === null ? "Invalid Number" : ""}
            label="电费"
            sx={{ m: '5%'}}
            type="number"
            defaultValue={order.basicInfo.electric}
            inputProps={{ min: "0", step: "0.01" }}
            onChange={e => setOrder(o => ({ ...o, basicInfo: { ...o.basicInfo, electric: parseHelper(e) }}))}
          />
          <TextField
            error={order.basicInfo.amz === null}
            helperText={order.basicInfo.amz === null ? "Invalid Number" : ""}
            label="AMZ费"
            sx={{ m: '5%'}}
            type="number"
            defaultValue={order.basicInfo.amz}
            inputProps={{ min: "0", step: "0.01" }}
            onChange={e => setOrder(o => ({ ...o, basicInfo: { ...o.basicInfo, amz: parseHelper(e) }}))}
          />
          <TextField
            error={order.basicInfo.internet === null}
            helperText={order.basicInfo.internet === null ? "Invalid Number" : ""}
            label="网费"
            sx={{ m: '5%'}}
            type="number"
            defaultValue={order.basicInfo.internet}
            inputProps={{ min: "0", step: "0.01" }}
            onChange={e => setOrder(o => ({ ...o, basicInfo: { ...o.basicInfo, internet: parseHelper(e) }}))}
          />
          <TextField
            error={order.basicInfo.other === null}
            helperText={order.basicInfo.other === null ? "Invalid Number" : ""}
            label="其他"
            sx={{ m: '5%'}}
            type="number"
            defaultValue={order.basicInfo.other}
            inputProps={{ min: "0", step: "0.01" }}
            onChange={e => setOrder(o => ({ ...o, basicInfo: { ...o.basicInfo, other: parseHelper(e) }}))}
          />
        </Container>
      </Container>
    </div>
  )
}