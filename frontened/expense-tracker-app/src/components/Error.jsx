import './Header.css'
const Error=()=>{
    
    return (
        <div className="error" style={{'height':'95vh', 'display':'flex','alignItems':'center','justifyContent':'center'}} >
            <img src="/error.png" alt="error"  style={{width:'200px'}}/>
            <h2>Page Not Found</h2>
        </div>
    );
}


export default Error;