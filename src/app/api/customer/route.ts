import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from '@/app/lib/prisma'


export async function POST(request: Request) {

    const session = await getServerSession(authOptions)

    {/* STATUS 401 -> NÃO AUTORIZADO
        STATUS 400 -> BAD REQUEST / REQUISIÇÃO FALHOU
    */}
    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }

    const { name, email, phone, address, userId } = await request.json()

    {/* Se tiver endereço eu mando endereço, se não envio uma string vazia */}

    try {
        await prismaClient.customer.create({
            data: {
                name,
                phone,
                email,
                address: address ? address : "",
                userId: userId
            }
        })

        return NextResponse.json({ message: "Cliente cadastrado com sucesso!" })
    } catch (err) {
        return NextResponse.json({ error: "Falha ao criar novo cliente" }, { status: 400 })
    }



    
}