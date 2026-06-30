import { ElementType, FC, useMemo, useState } from 'react';
import { Box, Cpu, Fan, HardDrive, MemoryStick, Monitor, Plus, Server, Zap } from 'lucide-react';

import { Component, ComponentCategory } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const iconMap: Record<ComponentCategory['icon'], ElementType> = {
  Cpu,
  Monitor,
  Server,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan,
};

type CategoryRow = {
  id: string;
  name: string;
  icon: string;
};

type Props = {
  components: CategoryRow[];
  selectedByCategory: Record<string, Component | null>;
  onSelectedComponent: (category: string, component: Component | null) => void;
};

const TableParts: FC<Props> = ({ components, selectedByCategory, onSelectedComponent }) => {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const totalPrice = useMemo(
    () => Object.values(selectedByCategory).reduce((sum, c) => sum + Number(c?.price ?? 0), 0),
    [selectedByCategory],
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Компонент</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Модель</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {components.map((category) => {
          const Icon = iconMap[category.icon];
          const selected = selectedByCategory[category.id];
          const onOpenChange = (open: boolean) => setOpenCategoryId(open ? category.id : null);

          return (
            <TableRow key={category.id} className="my-2">
              <TableCell>
                <div className="flex items-center">
                  <Icon className="h-5 w-5 mr-1" />
                </div>
              </TableCell>
              <TableCell className="font-bold">{category.name}</TableCell>
              <TableCell>{selected?.name ?? '-'}</TableCell>
              <TableCell>{selected?.price ?? '-'}</TableCell>
              <TableCell className="text-right">
                <Dialog open={openCategoryId === category.id} onOpenChange={onOpenChange}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      {selected ? 'Изменить' : 'Добавить'}
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableParts;
