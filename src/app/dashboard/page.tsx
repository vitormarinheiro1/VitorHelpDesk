import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TicketItem } from "./components/ticket";
import prismaClient from '@/app/lib/prisma'
import { ButtonRefresh } from "./components/button";


export default async function Dashboard() {
    const session = await getServerSession(authOptions)


    if (!session || !session.user) {
        redirect("/")
    }

    {/* where: {
            userId: session.user.id,
            status: "ABERTO" */}
    const tickets = await prismaClient.ticket.findMany({
        where: {

            status: "ABERTO",
            customer: {
                userId: session.user.id
            }
        },
        include: {
            customer: true
        },
        orderBy: {
            created_at: "asc"
        }
    })

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Chamados</h1>
                    <div className="flex items-center gap-4">
                        <ButtonRefresh />
                        <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                            Abrir chamado
                        </Link>
                    </div>
                </div>

                <table className="min-w-full my-2">
                    <thead>
                        <tr>
                            <th className="text-medium text-left pl-1">CLIENTE</th>
                            {/* hidden esconde o td de data e o sm:block faz com que exiba em telas maiores */}
                            <th className="text-medium text-left hidden sm:block">DATA CADASTRO</th>
                            <th className="text-medium text-left">STATUS</th>
                            <th className="text-medium text-left">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <TicketItem
                                key={ticket.id}
                                customer={ticket.customer}
                                ticket={ticket}
                            />
                        ))}
                    </tbody>
                </table>
                {tickets.length === 0 && (
                    <h1 className="px-2 mb:px-0 text-gray-600">Nenhum ticket aberto foi encontrado...</h1>
                )}
            </main>
        </Container>
    )
}
