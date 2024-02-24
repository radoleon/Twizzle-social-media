import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material"
import { Comment as CommentIcon, Favorite as LikeIcon } from '@mui/icons-material';
import { useTheme } from "@emotion/react"
import { red } from "@mui/material/colors"

export default function ActionButtons({ post, currentUser, updateDocument, setOpenedComments }) {

    const [isLiked, setIsLiked] = useState(false)
    const { palette } = useTheme()

    useEffect(() => {
        post.likes.includes(currentUser.uid) ? setIsLiked(true) : setIsLiked(false)

    }, [post])

    function likeOnClick() {
        let likes

        if (!isLiked) {
            likes = post.likes
            likes.push(currentUser.uid)

        }
        else {
            likes = post.likes.filter(uid => uid != currentUser.uid)
        }

        updateDocument("posts", post.id, "likes", likes)
    }

    return (
        <Stack direction="row" spacing={2}>
            <Button 
                variant="outlined" 
                startIcon={<LikeIcon />}
                color="inherit"
                sx={{ 
                    width: "fit-content", 
                    borderRadius: "100vw", 
                    paddingBlock: 0.25, 
                    color: isLiked ? red[900] : palette.text.primary,
                    fontWeight: 700
                }}
                disableElevation
                onClick={likeOnClick}
            >
                {post.likes.length}
            </Button>
            
            <Button 
                variant="outlined" 
                startIcon={<CommentIcon />}
                color="inherit"
                sx={{ 
                    width: "fit-content", 
                    borderRadius: "100vw", 
                    paddingBlock: 0.25,
                    color: palette.text.primary,
                    fontWeight: 700
                }}
                disableElevation
                onClick={() => setOpenedComments(prevValue => !prevValue)}
            >
                {post.comments.length}
            </Button>
        </Stack>
    )
}
