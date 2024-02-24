import { useState } from 'react'
import { Button, Paper, TextField, Typography } from "@mui/material"
import { nanoid } from "nanoid"

export default function CommentsForm({ currentUser, post, updateDocument }) {

    const [commentFormError, setCommentFormError] = useState(false)
    const [commentData, setCommentData] = useState("")

    async function handleCommentSubmit() {

        if (!commentData) {
            setCommentFormError(true)
            return
        }

        const comments = post.comments
        comments.push({ id: nanoid(), createdBy: currentUser, content: commentData, time: JSON.stringify(new Date()) })

        const success = await updateDocument("posts", post.id, "comments", comments)
    
        if (success) setCommentData("")
    }

    return (
        <Paper sx={{ padding: 4, marginBlock: 1 }} elevation={0}>
            <Typography color="primary" fontSize={18} fontWeight={500} mb={2}>
                Add a comment as
                <Typography component="span" color="textPrimary" fontSize={18} fontWeight={500}>
                    {" " + currentUser.username}
                </Typography>
            </Typography>

            <TextField 
                variant="outlined"
                size="small"
                fullWidth
                multiline
                minRows={3}
                maxRows={3}
                sx={{ mb: 3 }}
                label="Comment"
                onChange={e => {
                    setCommentFormError(false)
                    setCommentData(e.target.value)
                }}
                value={commentData}
                error={commentFormError}
                helperText={commentFormError ? "Incorrect Entry" : ""}
            />

            <Button
                variant="outlined"
                children="SUBMIT"
                sx={{ width: { xs: "100%", sm: "auto" } }}
                onClick={handleCommentSubmit}
            />
        </Paper>
    )
}
