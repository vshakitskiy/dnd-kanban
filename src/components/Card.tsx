import { Dispatch, SetStateAction, useRef } from "react"
import { CardContent, MoveCardHandler } from "../lib/types"
import { useDrag, useDrop } from "react-dnd"

const Card = ({ name, setCards, index, moveCardHandler }: {
    name: string
    setCards: Dispatch<SetStateAction<CardContent[]>>
    index: number
    moveCardHandler: MoveCardHandler
}) => {
    const changeItemColumn = (currentItem: {
        index: number
        name: string
    }, columnId: number) => {
        setCards((prev) =>
            prev.map(card => ({
                ...card,
                columnId: card.name === currentItem.name ? columnId : card.columnId
            }))
        )
    }

    const ref = useRef<HTMLDivElement>(null)

    const [, drop] = useDrop({
        accept: "card",
        hover: (item: {
            index: number
            name: string
        }, monitor) => {
            if (!ref.current)
                return

            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex)
                return

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()

            if (!clientOffset)
                return

            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveCardHandler(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })


    const [{ isDragging }, drag] = useDrag({
        item: {
            index,
            name
        },
        type: "card",
        collect: (monitor) => {
            const isDragging = monitor.isDragging()

            return {
                isDragging
            }
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult() as {
                id: number
            } | null

            if (!dropResult)
                return

            changeItemColumn(item, dropResult.id)
        }
    })

    drag(drop(ref))

    return (
        <div ref={ref} className={`w-80 h-28 p-5 rounded-lg ${isDragging ? "bg-[#5130e52c] border border-dashed border-[#5130e5aa]" : "bg-white"}`}>
            {name}
        </div>
    )
}

export default Card