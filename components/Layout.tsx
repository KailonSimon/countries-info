import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => (
  <div>
    <main className="box-border flex flex-col items-start w-full min-h-screen p-4">
      {children}
    </main>
  </div>
);

export default Layout;
