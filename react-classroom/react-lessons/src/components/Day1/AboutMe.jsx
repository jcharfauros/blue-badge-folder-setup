const AboutMe = (props) => {
    return(
        <div>
            <h1 style={{color: "pink"}}>{props.name}</h1>
            <p>I grew up in {props.cityState}</p>
            <ul style={{listStyleType: 'none', textAlign: 'left'}}>
                <li>Korea</li>
                <li>Germany</li>
                <li>Palau</li>
            </ul>
        </div>
    )
}
export default AboutMe;