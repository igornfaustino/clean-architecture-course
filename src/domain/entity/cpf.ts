export class CPF {
  public cpf: string;

  constructor(cpf: string) {
    const normalizedCpf = this.normalizeCpf(cpf);
    if (!this.isCPFValid(normalizedCpf)) throw new Error("CPF is invalid");
    this.cpf = normalizedCpf;
  }

  private isEveryDigitTheSame = (digits: string) =>
    digits.split("").every((c) => c === digits![0]);

  private calcVerificationNumber(digits: string) {
    let multiplier = digits.length + 1;
    const multipliedDigits = digits
      .split("")
      .map((digit) => parseInt(digit) * multiplier--);
    const digitsSum = multipliedDigits.reduce((acc, curr) => acc + curr, 0);
    const rest = digitsSum % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  private calculateCPF(cpf: string) {
    const firstNineDigits = cpf.substring(0, 9);
    const firstVerificationDigit = this.calcVerificationNumber(firstNineDigits);
    const firstTenDigits = `${firstNineDigits}${firstVerificationDigit}`;
    const secondVerificationDigit = this.calcVerificationNumber(firstTenDigits);
    return `${firstTenDigits}${secondVerificationDigit}`;
  }

  private normalizeCpf = (cpf: string) => cpf.replace(/[\.\-]/g, "").trim();

  private isCPFValid(cpf: string | null | undefined) {
    if (!cpf) return false;
    if (cpf.length !== 11) return false;
    if (this.isEveryDigitTheSame(cpf)) return false;
    const calculatedCpf = this.calculateCPF(cpf);
    return cpf == calculatedCpf;
  }
}
