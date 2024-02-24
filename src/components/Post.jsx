import { useEffect, useState } from "react"
import { Avatar, IconButton, Paper, Stack, Typography, Box, useTheme } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from "date-fns"
import { useFirestore } from "../hooks/useFirestore";
import Error from "./Error"
import ActionButtons from "./ActionButtons";
import CommentsForm from "./CommentsForm";
import Comment from "./Comment"
import { AnimatePresence, motion } from "framer-motion";

export default function Post({ post, currentUser }) {

    const { palette } = useTheme()
    const [postDate, setPostDate] = useState(null)
    const { error, deleteDocument, updateDocument } = useFirestore()
    const [openedComments, setOpenedComments] = useState(false)

    useEffect(() => {
        if (post.timestamp) {
            setPostDate(post.timestamp.toDate())
        }
    }, [post])

    return (
        <Box>
            <Paper elevation={0} sx={{ padding: 4, marginTop: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} position="relative" >
                    <Avatar sx={{ background: post.createdBy.color, color: "#000" }}>
                        {post.createdBy.username[0]}
                    </Avatar>
                    
                    <Stack 
                        direction={{ xs: "column", sm: "row" }} 
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        spacing={{ xs: 0, sm: 2}}
                    >
                        <Typography color="textPrimary" fontWeight={500}>
                            {post.createdBy.username}
                            {
                                post.createdBy.uid === currentUser.uid
                                &&
                                <Typography color="primary" fontWeight={500} sx={{ display: "inline", ml: 0.5 }} component="span">
                                    (you)
                                </Typography>
                            }
                        </Typography>
                        
                        <Typography color="textSecondary" fontSize={13}>
                            {format(new Date(postDate), "LLL dd, yyyy")}
                        </Typography>
                    </Stack>

                    {
                        post.createdBy.uid === currentUser.uid
                        &&
                        <IconButton 
                            size="medium" 
                            sx={{ color: palette.text.primary, position: "absolute", right: 0 }}
                            onClick={() => deleteDocument("posts", post.id)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    }
                </Stack>
                
                <Box sx={{ paddingBlock: 3 }}>
                    <Typography fontSize={20} fontWeight={700} mb={1}>
                        {post.title}
                    </Typography>
                    <Typography color="textSecondary" minHeight={70}>
                        {post.content}
                    </Typography>
                </Box>

                <ActionButtons 
                    post={post} 
                    currentUser={currentUser} 
                    setOpenedComments={setOpenedComments} 
                    updateDocument={updateDocument}
                />

                {error && <Error message={error} />}
            </Paper>

            <AnimatePresence>
                {
                    openedComments &&
                    <motion.div
                        key="comments"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <CommentsForm currentUser={currentUser} post={post} updateDocument={updateDocument} />

                        <Stack spacing={1} sx={{ borderLeft: `5px solid ${palette.primary.main}`, paddingLeft: 2 }}>
                            {post.comments.slice().reverse().map((comment, i) => (
                                <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <Comment comment={comment} />
                                </motion.div>
                            ))}
                        </Stack>
                    </motion.div>
                }  
            </AnimatePresence>
        </Box>
    )
}
