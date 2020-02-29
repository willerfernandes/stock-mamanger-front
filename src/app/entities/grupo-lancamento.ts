import { Lancamento } from './lancamento';

export class GrupoLancamento {
  id: number;
  categoria: string;
  valor: number;
  percentual: number;
  lancamentos: Lancamento[];
}
