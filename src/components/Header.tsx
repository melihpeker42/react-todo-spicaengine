
const Header = () => {
    const headerStyle = {
        padding:"20px 0",
        LineHeight:"1.5em",
    };
    
    return  (
        <header style={headerStyle}>
            <h2
              style={{
                fontSize: "5rem",
                fontWeight: "300",
                marginBottom: "2rem",
                lineHeight: "1em",
                color: "black",
                textTransform: "lowercase",
                textAlign: "center",
              }}        
             > Spica Todo</h2>

        </header>
    )
}

export default Header;