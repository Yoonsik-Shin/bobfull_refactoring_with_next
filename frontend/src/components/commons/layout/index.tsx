import { useRouter } from "next/router";
import { Layout as L } from "antd";
import LayoutContent from "./content";
import LayoutHeader from "./header";
import LayoutSider from "./navigation";
import LayoutFooter from "./footer";

const HIDDEN_HEADERS = [""];

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);

  return (
    <L style={{ minHeight: "100vh" }}>
      <L className="site-layout">
        {/* {!isHiddenHeader && <LayoutHeader />} */}
        {!isHiddenHeader && <LayoutContent chlidren={props.children} />}
        {!isHiddenHeader && <LayoutFooter />}
      </L>
      {!isHiddenHeader && <LayoutSider />}
    </L>
  );
}
