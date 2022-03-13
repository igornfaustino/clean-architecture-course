export class OrderCode {
  value: string

  constructor (date: Date, sequence: number) {
    this.value = `${date.getFullYear()}${String(sequence).padStart(8, '0')}`
  }
}
