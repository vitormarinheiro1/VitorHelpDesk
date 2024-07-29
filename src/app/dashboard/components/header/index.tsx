import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader(){
    return (
        <Container>
            <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4 text-white items-center hover:font-bold duration-300">
                <Link href="/dashboard">
                    Chamados
                </Link>
                <Link href="/dashboard/customer">
                    Clientes
                </Link>
            </header>
        </Container>
    )
}