import { DashboardHeader } from "./components/header";

export function DashboardLayout({ children}: {children: React.ReactNode}) {
    return(
        <>
            <DashboardHeader />
            {children}
        </>
    )
}