import Link from "next/link"
import { Button } from "./ui/button"
import isAdmin from "./_helpers/isUserAdmin"

export const Footer = async () => {
	return (
		<footer className="w-full bg-secondary py-6 px-3 lg:px-[150px] flex flex-col sm:flex-row sm:justify-between justify-center items-center">
			<span className="text-gray-400 text-xs font-bold opacity-75">© 2023 Copyright Carvalho Barbearia</span>
			{await isAdmin() && (
				<Button
					variant="link"
					asChild
				>
					<Link href="/admin">
						Gerenciar
					</Link>
				</Button>
			)}
		</footer>
	)
}
