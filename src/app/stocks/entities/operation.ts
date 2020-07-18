import {Stock} from './stock';
import { User } from 'src/app/common/entities/user';

export class Operation {
  id: number;
  dataOperacao: string;
  guid: string;
  quantidade: number;
  valorPapel: number;
  valorTotal: number;
  tipoOperacao: string;
  usuario: User;
  papel: Stock;
}
