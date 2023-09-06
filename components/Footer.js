import { Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Container
      disableGutters
      // sx={{ height: "240px", borderTop: "10px solid #EAE7E5", p: 4 }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Typography className="input-title" sx={{ color: "#1E1D1C" }}>
          상호&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;사업자등록번호
        </Typography>
        <Typography className="input-title" sx={{ color: "#1E1D1C" }}>
          대표자&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;대표자명 적기
        </Typography>
        <Typography className="input-title" sx={{ color: "#1E1D1C" }}>
          연락처&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;전화번호 적기
        </Typography>
        <Typography className="input-title" sx={{ color: "#1E1D1C" }}>
          이메일&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;이메일 적기
        </Typography>
        <Typography className="input-title" sx={{ color: "#1E1D1C" }}>
          주소&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;주소 적기
        </Typography>
      </Container>
    </Container>
  );
}
