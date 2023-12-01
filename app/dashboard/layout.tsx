import NavBar from "@/components/NavBar"

export const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="w-full min-h-full h-full">
            <NavBar />
            <div className="ml-64 p-4 px-32">
                {children}

            </div>
        </div>
    )
}

export default layout;