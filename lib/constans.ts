import { ComponentCategory } from '@/lib/types';

export const componentCategory: ComponentCategory[] = [
  { id: 'cpu', name: 'Процессор', icon: 'Cpu' },
  { id: 'gpu', name: 'Видеокарта', icon: 'Monitor' },
  { id: 'motherboard', name: 'Материнская плата', icon: 'Server' },
  { id: 'ram', name: 'Оперативная память', icon: 'MemoryStick' },
  { id: 'storage', name: 'Накопитель', icon: 'HardDrive' },
  { id: 'psu', name: 'Блок питания', icon: 'Zap' },
  { id: 'case', name: 'Корпус', icon: 'Box' },
  { id: 'cooling', name: 'Охлаждение', icon: 'Fan' },
];
