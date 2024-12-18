import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	children: ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, ...props }) => {
	return (
		<Link href={href} {...props}>
			<span style={{ color: "#fff", opacity: 0.3 }}>&lt;/</span>
			{children}
			<span style={{ color: "#fff", opacity: 0.3 }}>&gt;</span>
		</Link>
	);
};

export default CustomLink;
