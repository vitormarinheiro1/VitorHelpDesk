import { authOptions } from "@/app/lib/auth";
import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Customer() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }
    return (
        <Container>
            <main>
                <div>
                    <h1>Meus Clientes</h1>
                </div>
            </main>
        </Container>
    )
}