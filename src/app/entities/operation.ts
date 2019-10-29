import {User} from './user';
import {Stock} from './stock';

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
