import { ReactElement } from "react"
import { useDrop } from "react-dnd"

const Column = ({ children, id, title }: {
    children: ReactElement[]
    id: number
    title: string
}) => {
    const [, drop] = useDrop({
        accept: "card",
        drop: () => ({ id })
    })

    return <div ref={drop} className="w-96 rounded-lg p-5 shadow-md bg-[#F5F5F5]">
        <p className="mb-5">{title}</p>
        <div className="border-t border-2 border-[#5030E5] mb-5" />
        <div className="flex justify-center flex-wrap flex-col gap-4">
            {children}
        </div>
    </div>
}

export default Column