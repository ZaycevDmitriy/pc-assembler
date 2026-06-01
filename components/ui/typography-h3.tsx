import type { FC, ReactNode } from 'react';

type TypographyH3Props = {
  children: ReactNode;
}

export const TypographyH3: FC<TypographyH3Props> = ({ children }) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  )
}