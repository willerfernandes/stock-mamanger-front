export class Stock {
  id: number;
  codPapel: string;
  empresaPapel: string;
  codEmpresaBovespa: string;
  valor: number;
  valorMaximo: number;
  valorMinimo: number;
  stockInfo: StockInfo;
  operations: Opertion[];
}