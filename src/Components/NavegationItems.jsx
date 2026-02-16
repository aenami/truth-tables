import "../styles/navbar.css"


export function NavItems({ title }){
    return <button className="items">
        <h3>{title}</h3>
        <div className="line"></div>
    </button>
}