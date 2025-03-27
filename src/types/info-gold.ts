export interface GoldAward {
  value?: {
    qte: number
    prefix?: string | ComputedRef<string>
    suffix?: string | ComputedRef<string>
  }
  name: string | ComputedRef<string>
}
