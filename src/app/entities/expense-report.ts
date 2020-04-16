import { ItemGrafico } from './item-grafico';
import { GrupoLancamento } from './grupo-lancamento';

export class ExpenseReport {
  valorTotalDespesas: number;
  valorTotalReceitas: number;
  itemGrafico: ItemGrafico;
  gruposLancamentosDespesas: GrupoLancamento[];
  gruposLancamentosReceitas: GrupoLancamento[];
}
