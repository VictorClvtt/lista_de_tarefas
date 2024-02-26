import { useState, useRef } from "react"

export function ToDoList() {

    const [lista, setLista] = useState([])
    const [novoItem, setNovoItem] = useState("")

    function adicionaItem(form) {
        form.preventDefault()
        if (!novoItem) {
            return
        }
        // Adiciona o valor contido no input à array setLista
        setLista([...lista, { text: novoItem, isCompleted: false }])
        setNovoItem("")
        document.getElementById('input-entrada').focus()
    }

    const deletaItem = (indexDeletado) => {
        const updatedList = lista.filter((item, index) => index !== indexDeletado)
        setLista(updatedList)
    }

    const completaItem = (indexCompleto) => {
        const updatedList = lista.map((item, index) => {
            if (index === indexCompleto) {
                return { ...item, isCompleted: !item.isCompleted }
            }
            return item
        })
        setLista(updatedList)
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center px-3">
                <div className="flex justify-center py-3 w-full gap-2">
                    <div className="flex flex-col border-b pb-3 border-gray-700 w-full max-w-6xl gap-2">
                        <h1 className="text-2xl max-w-6xl">Lista de Tarefas ଘ(ᵕ ૩ᵕ)━☆ﾟ.*･｡ﾟ </h1>
                        <form className="flex rounded-r-lg" onSubmit={adicionaItem}>
                            <input
                                id="input-entrada"
                                className="bg-gray-800 px-2 py-1 w-full max-w-lg focus:outline-none focus:bg-slate-700"
                                type="text"
                                placeholder="Adicione uma tarefa."
                                value={novoItem}
                                onChange={(e) => { setNovoItem(e.target.value) }} />
                            <button className="text-lg text-emerald-400 bg-emerald-900 px-2 py-1 rounded-r-lg hover:text-emerald-50 hover:bg-emerald-700" type="submit">Add</button>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full gap-2 mb-2" id="tarefas">

                    {
                        lista.length < 1
                            ?
                            <p className="text-gray-700 text-4xl py-16 text-center">Nenhuma tarefa por enquanto ( •_•)</p>
                            :
                            <>
                                {lista.map((item, index) => (
                                    !item.isCompleted
                                        ?
                                        <div className="flex items-center  bg-gray-950 px-6 py-3 justify-between max-w-6xl w-full border border-gray-600 rounded-sm" id="item" onClick={() => completaItem(index)}>
                                            <span className="text-gray-300 overflow-auto">{item.text}</span>
                                            <button className="text-red-500 bg-red-950 px-2 py-1 rounded-md hover:text-red-50 hover:bg-red-900" onClick={(e) => { e.stopPropagation(); deletaItem(index) }}>Deletar</button>
                                        </div>
                                        :
                                        <div className="flex items-center bg-gray-950 px-6 py-3 justify-between max-w-6xl w-full border border-gray-800 rounded-sm" id="item" onClick={() => completaItem(index)}>
                                            <span className="text-gray-500 line-through overflow-auto">{item.text}</span>
                                            <button className="text-red-500 bg-red-950 px-2 py-1 rounded-md hover:text-red-50 hover:bg-red-900" onClick={(e) => { e.stopPropagation(); deletaItem(index) }}>Deletar</button>
                                        </div>
                                ))}
                                <button className="bg-zinc-950 text-red-700 px-2 py-1 rounded-lg text-xs font hover:bg-zinc-800 hover:text-red-400" onClick={() => { setLista([]) }}>Deletar todas</button>
                            </>
                    }
                </div>
            </div>
        </>
    )
}