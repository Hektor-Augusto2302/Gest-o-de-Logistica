export default function ArrowDown({ size = 15, color = "black", className = "" }) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill={color} 
            className={className}
        >
            <path d="M12 18L6 9H18L12 18Z" />
        </svg>
    );
}