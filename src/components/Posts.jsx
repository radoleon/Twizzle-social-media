import { Typography, Box } from "@mui/material"
import Post from "./Post"

export default function Posts({ currentUser, posts }) {

    return (
        <Box sx={{ paddingBlock: 4 }}>
            <Typography color="primary" sx={{ fontWeight: 700, fontSize: 36, lineHeight: 0.8 }}>Feed</Typography>
            <Box>
                {
                    posts.length === 0 && 
                    <Typography mt={2} color="textPrimary" fontSize={16}>Be the first to add a post!</Typography>
                }
                {posts.map(post => <Post key={post.id} post={post} currentUser={currentUser} />)}
            </Box>
        </Box>
    )
}
