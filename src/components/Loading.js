import classes from './Loading.module.css'
import ProgressBar from './ProgressBar'

export default function Loading(props) {
    return (
        <div className={classes.divContainer}>
            <div className={classes.spinner} />
            <h3>Items Loaded: {props.itemsLoaded}</h3>
            <ProgressBar value={props.itemsLoaded * 5} />
        </div>
    )
}