import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const DashboardLayout: FC<Props> = ({ children }) => (
  <div className="container mx-auto max-w-5xl mt-8">{children}</div>
);

export default DashboardLayout;
