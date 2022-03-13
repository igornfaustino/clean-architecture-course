export interface Connection {
  query(stmt: string, parmas: any): Promise<any>
  close(): Promise<void>
}
