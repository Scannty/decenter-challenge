import { LinearProgress, Box, Typography } from "@mui/material"

export default function ProgressBar(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 300, mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}
                </Typography>
            </Box>
        </Box>
    )
}