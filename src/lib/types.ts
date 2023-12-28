type CardContent = {
    id: number
    name: string
    columnId: number
}
type MoveCardHandler = (dragIndex: number, hoverIndex: number) => void

export type {
    CardContent,
    MoveCardHandler
}