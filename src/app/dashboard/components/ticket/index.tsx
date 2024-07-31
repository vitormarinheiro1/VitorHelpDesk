'use client'
import { api } from "@/app/lib/api";
import { CustomerProps } from "@/app/utils/customer.type";
import { TicketProps } from "@/app/utils/ticket.type";
import { ModalContext } from "@/providers/modal";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FiCheckSquare, FiFile } from "react-icons/fi";



interface TicketItemProps {
    ticket: TicketProps
    customer: CustomerProps | null
}

export function TicketItem({ customer, ticket }: TicketItemProps) {

    const { handleModalVisible, setDetailTicket } = useContext(ModalContext)

    const router = useRouter()

    async function handleChangeStatus() {
        try {
            await api.patch("/api/ticket", {
                id: ticket.id
            })

            router.refresh()
        } catch (err) {
            console.log(err)
        }
    }

    function handleOpenModal() {
        handleModalVisible()
        setDetailTicket({
            customer: customer,
            ticket: ticket
        })
    }

    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-200">
                <td className="text-left pl-1">{customer?.name}</td>
                {/* propriedade "last" -> o ultimo item da tabela exibe tal estilo */}
                {/* hidden esconde o td de data e o sm:block faz com que exiba em telas maiores ou table-cell itens de tabelas */}
                <td className="text-left hidden sm:table-cell">{ticket.created_at?.toLocaleDateString("pt-br")}</td>
                <td className="text-left">
                    <span className="bg-green-500 px-2 py-1 rounded-lg">{ticket.status}</span>
                </td>
                <td className="text-left">
                    <button className="mr-3" onClick={handleChangeStatus}>
                        <FiCheckSquare size={24} color="#131313" />
                    </button>
                    <button onClick={handleOpenModal}>
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    )
}