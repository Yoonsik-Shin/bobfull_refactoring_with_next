import { Layout, theme } from "antd";

export default function LayoutHeader() {
  const { Header } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return <Header style={{ padding: 0, background: colorBgContainer }} />;
}
