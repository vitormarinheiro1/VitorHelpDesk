'use client'
import { api } from "@/app/lib/api";
import { CustomerProps } from "@/app/utils/customer.type";
import { useRouter } from "next/navigation";

export function CardCustomer({ customer }: { customer: CustomerProps }) {

    const router = useRouter()

    async function handleDeleteCustomer() {
        try {
            const response = await api.delete("/api/customer", {
                params: {
                    id: customer.id
                }
            })

            console.log(response.data)
            router.refresh()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
            <h2 className="">
                <span className="font-bold">Nome:</span> {customer.name}
            </h2>
            <p><span className="font-bold">Email:</span> {customer.email}</p>
            <p><span className="font-bold">Telefone:</span> {customer.phone}</p>
            <button
                onClick={handleDeleteCustomer}
                className="bg-red-500 px-4 rounded text-white mt-2 self-start"
            >
                Deletar
            </button>
        </article>
    )
}