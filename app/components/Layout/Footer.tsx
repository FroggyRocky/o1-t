import { Link } from '@tanstack/react-router';

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Copyright */}
                <div className="text-sm">
                    &copy; {new Date().getFullYear()} O1. All rights reserved.
                </div>
                {/* Social Media Links */}
                <div className="flex space-x-4">
                    <a href="https://twitter.com" className="hover:underline focus:outline-none focus:ring">
                        Twitter
                    </a>
                    <a href="https://facebook.com" className="hover:underline focus:outline-none focus:ring">
                        Facebook
                    </a>
                    <a href="https://github.com" className="hover:underline focus:outline-none focus:ring">
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}
