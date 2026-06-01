import type { FC, ReactNode } from 'react';

type TypographyH1Props = {
  children: ReactNode;
}

export const TypographyH1: FC<TypographyH1Props> = ({ children }) => {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  )
}