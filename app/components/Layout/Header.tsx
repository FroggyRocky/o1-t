import { Link } from '@tanstack/react-router';
import {useIsAuth} from '@hooks/hooks';

export function Header() {
    const isAuth = useIsAuth();
    return (
        <header className="bg-gray-800 text-white">
            <nav className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <div className="text-lg font-bold">
                    <Link to="/" className="hover:underline focus:outline-none focus:ring">
                        O1
                    </Link>
                </div>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/invites" className="hover:underline focus:outline-none focus:ring">
                            Invites
                        </Link>
                    </li>
                </ul>
                {!isAuth && <Link to="/login" className="hover:underline focus:outline-none focus:ring">
                        Login
                    </Link>}
            </nav>
        </header>
    );
}
