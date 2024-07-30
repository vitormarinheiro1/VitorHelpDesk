import { FiFile, FiTrash2 } from "react-icons/fi";

interface TicketItemProps {
    cliente: string
    data: string
}

export function TicketItem({ cliente, data }: TicketItemProps) {
    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-200">
                <td className="text-left pl-1">{cliente}</td>
                {/* propriedade "last" -> o ultimo item da tabela exibe tal estilo */}
                {/* hidden esconde o td de data e o sm:block faz com que exiba em telas maiores ou table-cell itens de tabelas */}
                <td className="text-left hidden sm:table-cell">{data}</td>
                <td className="text-left">
                    <span className="bg-green-500 px-2 py-1 rounded-lg">aberto</span>
                </td>
                <td className="text-left">
                    <button className="mr-2">
                        <FiTrash2 size={24} color="#ef4444" />
                    </button>
                    <button>
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    )
}