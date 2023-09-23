'use client'

import { Typography, Container, Button, Divider } from "@mui/material";

export default function WeightPannel({ weight, handleWeight }) {

  return (
    <span style={{marginTop:'24px'}}>
      {/* <Divider marginTop="24px"> */}
        <Typography className="heading4-gray">
          중요도
        </Typography>
      {/* </Divider> */}
      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          paddingLeft: "5px",
          overflowX: "scroll",
        }}
      >
        <Button
          onClick={() => {
            handleWeight(1);
          }}
          color={weight == 1 ? "primary" : "secondary"}
          variant="contained"
          size="small"
          sx={{
            borderRadius: "8px",
            height: "35px",
            minWidth: "40px",
            boxShadow: "none",
          }}
        >
          1
        </Button>
        <Button
          onClick={() => {
            handleWeight(2);
          }}
          color={weight == 2 ? "primary" : "secondary"}
          variant="contained"
          sx={{
            borderRadius: "8px",
            height: "35px",
            minWidth: "40px",
            boxShadow: "none",
          }}
        >
          2
        </Button>
        <Button
          onClick={() => {
            handleWeight(3);
          }}
          color={weight == 3 ? "primary" : "secondary"}
          variant="contained"
          sx={{
            borderRadius: "8px",
            height: "35px",
            minWidth: "40px",
            boxShadow: "none",
          }}
        >
          3
        </Button>
        <Button
          onClick={() => {
            handleWeight(4);
          }}
          color={weight == 4 ? "primary" : "secondary"}
          variant="contained"
          sx={{
            borderRadius: "8px",
            height: "35px",
            minWidth: "40px",
            boxShadow: "none",
          }}
        >
          4
        </Button>
        <Button
          onClick={() => {
            handleWeight(5);
          }}
          color={weight == 5 ? "primary" : "secondary"}
          variant="contained"
          sx={{
            borderRadius: "8px",
            minHeight: "35px",
            minWidth: "104px",
            boxShadow: "none",
          }}
        >
          반드시 반영
        </Button>
      </Container>
    </span>
  );
}
