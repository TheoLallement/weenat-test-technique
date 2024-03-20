export type Article = {
  id?: string
  title: string
  price: number
  tva: number
}

export const ArticleDefault: Article = {
  id: undefined,
  title: '',
  price: NaN,
  tva: 20
}
