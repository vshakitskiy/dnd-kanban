import { useState, ReactElement } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { CardContent, MoveCardHandler } from "./lib/types"
import Card from "./components/Card"
import Column from "./components/Column"

const App = () => {
    const data: {
        cards: CardContent[]
        columns: {
            id: number
            title: string
            className: string
        }[]
    } = {
        cards: [
            {
                id: 1,
                name: "Item 1",
                columnId: 1
            },
            {
                id: 2,
                name: "Item 2",
                columnId: 1
            },
            {
                id: 3,
                name: "Item 3",
                columnId: 1
            }
        ],
        columns: [
            {
                id: 1,
                title: "Todo",
                className: "first-column"
            },
            {
                id: 2,
                title: "In progress",
                className: "second-column"
            },
            {
                id: 3,
                title: "Done",
                className: "third-column"
            },
        ]
    }

    const [cards, setCards] = useState<CardContent[]>(data.cards)

    const moveCardHandler: MoveCardHandler = (dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex]

        if (!dragCard)
            return

        setCards((prev) => {
            const next = [...prev]
            const prevCard = next.splice(hoverIndex, 1, dragCard)
            next.splice(dragIndex, 1, prevCard[0])

            return next
        })
    }

    const returnItemsForColumn = (columnId: number): ReactElement[] => {
        return cards
            .filter((card) => card.columnId === columnId)
            .map((card, index) => <Card
                key={card.id}
                name={card.name}
                setCards={setCards}
                index={index}
                moveCardHandler={moveCardHandler}
            />)
    }

    return (
        <main className="w-[1200px] mt-8 mx-auto">
            <div className="flex flex-row justify-around">
                <DndProvider backend={HTML5Backend}>
                    {data.columns.map(({ id, title }) => (
                        <Column
                            id={id}
                            title={title}
                            key={`column-${id}`}
                        >
                            {returnItemsForColumn(id)}
                        </Column>
                    ))}
                </DndProvider>
            </div>
        </main>
    )
}

export default App
