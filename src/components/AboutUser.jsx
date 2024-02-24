import { useEffect, useState } from "react";
import { Avatar, Paper, Stack, Typography, Button, useTheme, Box } from "@mui/material";
import { format } from "date-fns"
import StatsField from "./StatsField";
import { StickyNote2 as PostIcon, Comment as CommentIcon, Favorite as LikeIcon } from '@mui/icons-material';

function getUserAvatars(users) {
    const avatarElements = []

    for (let i = 0; i < 4; i++) {
        avatarElements.push(
            <Avatar key={users[i].uid} sx={{ border: "none", color: "black", background: users[i].color }}>
                { users[i].username[0] }
            </Avatar>
        )
    }

    return avatarElements
}

function getCurrentUserPostsDetails(posts, uid) {

    const currentUserPosts = posts.filter(post => post.createdBy.uid === uid)

    let likes = 0, comments = 0

    currentUserPosts.forEach(post => {
        likes += post.likes.length
        comments += post.comments.length
    })

    return {
        postsNumber: currentUserPosts.length,
        likesNumber: likes,
        commentsNumber: comments
    }
}

export default function AboutUser({ users, posts, currentUser, setShowModal }) {
    
    const { palette } = useTheme()
    
    const [currentUserDetails, setCurrentUserDetails] = useState({
        uid: "",
        username: "",
        color: "",
        postsNumber: "",
        likesNumber: "",
        commentsNumber: ""
    })
    
    useEffect(() => {
        const currentUserPostsDetails = getCurrentUserPostsDetails(posts, currentUser.uid)
        setCurrentUserDetails({ ...currentUser, ...currentUserPostsDetails })

    }, [posts, currentUser])

    return (
        <Box sx={{ paddingBottom: 4, borderBottom: "1px solid #000"}}>
            <Stack 
                direction={{ xs: "colum", sm: "row" }} 
                justifyContent="space-between" 
                alignItems={{ sm: "center" }}
                sx={{ paddingBlock: 4}}
            >
                <Typography color="textPrimary" fontSize={18} fontWeight={500} >{format(new Date(), "PPP")}</Typography>
                
                <Stack sx={{ mt: {xs: 2, sm: 0}}} direction="row" spacing={2} alignItems="center">
                    <Typography color="textPrimary" fontWeight={700}>Users:</Typography>
                    
                    <Stack  direction="row-reverse" spacing={-1.35}>
                        {
                            users.length > 1 &&
                            <Avatar sx={{ border: "none", color: "black" }}>
                               +{ users.length > 4 ? users.length - 4 : users.length - 1 }
                            </Avatar>
                        }
                        {
                            users.length > 4 && getUserAvatars(users)
                        }
                        {
                            users.length <= 4 && users.length > 0 &&
                            <Avatar sx={{ border: "none", color: "black", background: users[0].color }}>
                                { users[0].username[0] }
                            </Avatar>
                        }
                    </Stack>
                </Stack>
            </Stack>
            
            <Paper elevation={0} sx={{ padding: 4 }}>
                <Typography fontSize={18}>
                    Welcome back,
                    <b style={{color: palette.primary.main, fontWeight: 700}}> { currentUserDetails.username }</b>
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" mt={3}>
                    <Stack 
                        direction="row" 
                        spacing={3} 
                        width={{ xs: "100%", sm: "auto" }} 
                        justifyContent="space-between"
                        sx={{ marginBottom: { xs: 3, sm: 0 } }}
                    >
                        <StatsField icon={<PostIcon sx={{ fontSize: { xs: 32, sm: 20 } }} />} name="Posts" value={
                            currentUserDetails.postsNumber
                        } />
                        <StatsField icon={<LikeIcon sx={{ fontSize: { xs: 32, sm: 20 } }} />} name="Likes" value={
                            currentUserDetails.likesNumber
                        } />
                        <StatsField icon={<CommentIcon sx={{ fontSize: { xs: 32, sm: 20 } }} />} name="Comments" value={
                            currentUserDetails.commentsNumber
                        } />
                    </Stack>

                    <Button 
                        variant="outlined" 
                        children="NEW POST"
                        sx={{ width: { xs: "100%", sm: "auto" } }}
                        onClick={() => setShowModal(true)}
                    />
                </Stack>
            </Paper>
        </Box>
    )
}
