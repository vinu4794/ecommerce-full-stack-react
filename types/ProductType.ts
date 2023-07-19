export type ProductType = {
    name: string
    unit_amount: number | null
    quantity?: number | 1
    description: string | null
    metadata: MetadataType
    image: string
    id: string
}

type MetadataType = {
    features: string
}