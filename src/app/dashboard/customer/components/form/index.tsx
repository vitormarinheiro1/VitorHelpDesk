{/* INSTALAR BIBLIOTECAS
    1º npm i react-hook-form
    2º npm i @hookform/resolvers zod
*/}

'use client'

import { zodResolver } from "@hookform/resolvers/zod"
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

export function NewCustomerForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    return (
        <form>
            <label>Nome completo</label>
            <input
                type="text"
                placeholder="Digite o nome completo..."
            />
        </form>
    )
}