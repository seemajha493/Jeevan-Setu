import React from "react";

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Background Circle (Optional, often handled by parent, but good for standalone) */}
            {/* We keep it transparent to fit in containers */}

            {/* The Bridge / Hand Motif */}
            {/* Left swoosh (Orange - Energy/Assistance) */}
            <path
                d="M20 70 C 20 50, 40 30, 50 30 C 60 30, 70 40, 75 50"
                stroke="#EA580C" // Orange-600
                strokeWidth="8"
                strokeLinecap="round"
                className="text-orange-600"
            />

            {/* Right swoosh (Green - Growth/Life) - Interlocking */}
            <path
                d="M80 70 C 80 50, 60 30, 50 30 C 40 30, 30 40, 25 50"
                stroke="#15803D" // Green-700
                strokeWidth="8"
                strokeLinecap="round"
                className="text-green-700"
                strokeOpacity="0.9"
            />

            {/* Central Connection / Sun / Core */}
            <circle cx="50" cy="30" r="6" fill="#EA580C" className="text-orange-600" />

            {/* Abstract 'Water' or 'Support' lines below */}
            <path
                d="M25 80 Q 50 90 75 80"
                stroke="#15803D"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-green-700"
            />
        </svg>
    );
};

export default Logo;
