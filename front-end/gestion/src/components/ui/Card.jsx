export function Card({ children }) {
    return <div className="p-6 bg-white rounded-xl shadow-md">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div>{children}</div>;
  }
  