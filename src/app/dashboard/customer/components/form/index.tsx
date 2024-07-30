'use client'
{/* INSTALAR BIBLIOTECAS
    1º npm i react-hook-form
    2º npm i @hookform/resolvers zod
    */}


import { api } from "@/app/lib/api"
import { Input } from "@/components/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    email: z.string().email("Digite um e-mail válido.").min(1, "O e-mail é obrigatório"),
    phone: z.string().refine((value) => {
        {/*
            ^ -> ancora para iniciar o inicio e fim de uma string
            \d{2}\ -> valida que estamos esperando 2 digitos
            \s -> pode ter um espaço ou não como opcional
            \d{9} -> espere 9 caracteres a frente
            $ -> indica a finalização da string
        */}
        return /^:(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\id{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "O número de telefone deve estar (DD) 999999999"
    }),
    address: z.string(),
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm({ userId }: { userId: string }) {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter()

    async function handleRegisterCustomer(data: FormData) {
        await api.post("/api/customer", {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            userId: userId
        })

        router.replace("/dashboard/customer")
    }

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className="mb-1 text-lg font-medium">Nome completo</label>
            <Input
                type="text"
                name="name"
                placeholder="João Silva..."
                error={errors.name?.message}
                register={register}
            />
            <section className="flex gap-2 mt-2 my-2 flex-col sm:flex-row">
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Telefone</label>
                    <Input
                        type="number"
                        name="phone"
                        placeholder="(11) 99999-9999"
                        error={errors.phone?.message}
                        register={register}
                    />
                </div>

                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">E-mail</label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="hebromhelpdesk@email.com"
                        error={errors.email?.message}
                        register={register}
                    />
                </div>
            </section>

            <label className="mb-1 text-lg font-medium">Endereço completo</label>
            <Input
                type="text"
                name="address"
                placeholder="Avenida Campos Silva, São Paulo, 24"
                error={errors.email?.message}
                register={register}
            />

            <button
                type="submit"
                className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold"
            >
                Cadastrar
            </button>
        </form>
    )
}