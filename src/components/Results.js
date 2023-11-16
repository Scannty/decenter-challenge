export default function Results(props) {
    return (
        <div>
            <h1>Results:</h1>
            <ul>
                {
                    props.cdps.map(cdp => <li>{cdp.owner}</li>)
                }
            </ul>
        </div>
    )
}