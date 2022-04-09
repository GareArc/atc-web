import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postOrder } from "../../../api/requests/order";

  const dialogContents = {
    success: {
      title: 'Success!',
      txt: '已成功添加账单， 请于History页面查看。',
      error: false
    },
    failed: {
      title: 'Failed!',
      txt: '网页出现问题, 请重试或联系Gareth。',
      error: true
    }
  }
/**
 * 
 * @param {{ 
 * order: import("../../../../../models/Order").IOrder; 
 * setOrder: React.Dispatch<React.SetStateAction<import("../../../../../models/Order").IOrder>>
 * }} props 
 */
export const SubmitTab = (props) => {
  const { order, setOrder, initOrder } = props;
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(dialogContents.success);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  }
  const handleErrorClose = () => {
    setOpen(false);
  }
  const submitOrder = () => {
    setSubmitting(true);
  }



  useEffect(() => {
    if (submitting) {
      // send api
      postOrder(Object.assign({}, order))
        .then(() => {
          setSubmitting(false);
          setDialogContent(dialogContents.success);
          setOpen(true);
          setOrder(initOrder);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
          setDialogContent(dialogContents.failed);
          setOpen(true);
        })
    }
  }, [submitting])

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
        {submitting ? (
          <div>Submit in progress, please wait ...</div>
        ):(
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: '30%'
              }}
              onClick={submitOrder}
            >
              提交
            </Button>
          )
        }
        <Dialog open={open} onClose={dialogContent.error ? handleErrorClose : handleClose}>
          <DialogTitle>
            {dialogContent.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {dialogContent.txt}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={dialogContent.error ? handleErrorClose : handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  )
}