import { Avatar, Paper, Stack, Typography } from "@mui/material"
import { formatDistanceToNow } from "date-fns"
import { memo } from "react"

const Comment = memo(function Comment({ comment }) {
    return (
        <Paper sx={{ padding: 4, width: { xs: "100%", sm: "75%" } }} elevation={0}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ color: "#000", background: comment.createdBy.color, width: 30, height: 30, fontSize: 14 }}>
                    {comment.createdBy.username[0]}
                </Avatar>
                <Typography fontWeight={700} >
                    {comment.createdBy.username}
                </Typography>
                <Typography fontSize={13} color="textSecondary">
                    {formatDistanceToNow(JSON.parse(comment.time))} ago
                </Typography>
            </Stack>
            
            <Typography mt={2} color="textSecondary">
                {comment.content}
            </Typography>
        </Paper>
    )
})

export default Comment