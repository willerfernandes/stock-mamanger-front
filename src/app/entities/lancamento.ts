import { CategoriaLancamento } from './categoria-lancamento';

export class Lancamento {
  id: number;
  tipo: string;
  categoria: CategoriaLancamento;
  valor: number;
  data: string;
  descricao: string;
}
