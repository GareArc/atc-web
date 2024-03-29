import { Alert, AlertTitle, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import uuid from "react-uuid";

export const ImportTab = (props) => {
  const { order, setOrder } = props;
  const [json, setJson] = useState("");
  const [importing, setImporting] = useState(false);
  const [showError, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (importing) {
      if (showError) return;
      try {
        const importOrder = JSON.parse(json);
        const items = importOrder.lineItems.map(i => ({
          id: uuid(),
          title: i.productNameContent.zh,
          type: 'All',
          shareType: 'WithT1',
          target: 'Charlie',
          price: i.unitPrice,
          quantity: i.quantity,
          isTaxed: i.chargeTax
        }));
        setOrder(o => ({ ...o, items: items }));
        setJson("");
      } catch (err) {
        setShowErr(true);
        console.log(err, json);
      } finally {
        setImporting(false);
        setShowSuccess(true);
      }
    }
  }, [importing])

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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            m: '3%'
          }}
        >
          <Typography variant="h5" sx={{ mb: '1%' }}>
            支持导入DMall订单JSON
          </Typography>
          <TextField
            multiline
            rows={8}
            placeholder="在此处粘贴JSON"
            defaultValue={json}
            sx={{
              width: '60%',
              mb: '1%'
            }}
            onChange={e => setJson(e.target.value)}
          />
          {
            showError && (
              <Alert
                severity="error"
                onClose={() => setShowErr(false)}
                sx={{ width: 'fit-content', mb: '1%' }}
              >
                <AlertTitle>Invalid JSON</AlertTitle>
                JSON格式不正确, 请检查后重试。
              </Alert>
            )
          }
          {
            showSuccess && (
              <Alert
                severity="success"
                onClose={() => setShowSuccess(false)}
                sx={{ width: 'fit-content', mb: '1%' }}
              >
                <AlertTitle>导入成功!</AlertTitle>
                请在物品列表查看和修改。
              </Alert>
            )
          }
          <Button
            variant="contained"
            sx={{
              width: '10%'
            }}
            disabled={json === ""}
            onClick={() => setImporting(true)}
          >
            {importing ? "请稍等..." : "导入"}
          </Button>
        </Container>
      </Container>
    </div>
  )
}