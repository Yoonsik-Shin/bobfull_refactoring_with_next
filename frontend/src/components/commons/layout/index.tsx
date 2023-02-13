import { useRouter } from "next/router";
import LayoutSider from "./navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
const HIDDEN_HEADERS = [""];

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);

  return (
    <Container fixed>
      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>{props.children}</Box>
      {!isHiddenHeader && <LayoutSider />}
    </Container>
    // <L style={{ minHeight: "100vh" }}>
    //   <L className="site-layout">
    //     {/* {!isHiddenHeader && <LayoutHeader />} */}
    //     {!isHiddenHeader && <LayoutContent chlidren={props.children} />}
    //     {!isHiddenHeader && <LayoutFooter />}
    //   </L>

    // </L>
  );
}
