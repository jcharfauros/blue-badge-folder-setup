const Footer = (props) => {
    let d = new Date();
    let y = d.getFullYear();

    return(
        <div>
            <p>© EFA {y}</p>
            <p>© EFA {new Date().getFullYear()}</p>
            <p>© EFA {props.date}</p>
        </div>
    )
}

export default Footer;