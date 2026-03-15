export const PrimaryButton = ({children, onClick}:{
    children: React.ReactNode,
    onClick: () => void
}) => {
    return(
        <button onClick={onClick} className="text-high2 border-1 border-high1 w-max h-max rounded-2xl text-md hover:cursor-pointer hover:scale-105 hover:bg-high1 px-4 py-1 ">
            {children}
        </button>
    )
}