import classes from './Loading.module.css'
import ProgressBar from './ProgressBar'

export default function Loading(props) {
    return (
        <div>
            <div className={classes.spinner} />
            <h2>Items Loaded: {props.itemsLoaded}</h2>
            <ProgressBar value={props.itemsLoaded * 5} />
        </div>
    )
}