import { useState } from 'react'
import { Modal, Paper, Typography, TextField, Button, Avatar, Container, Stack } from "@mui/material"
import { serverTimestamp } from "firebase/firestore"
import { useFirestore } from "../hooks/useFirestore"
import { nanoid } from "nanoid"
import Loader from "./Loader"
import Error from "./Error"

const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: "none"
}

export default function ModalForm({ showModal, setShowModal, currentUser }) {

    const [modalFormData, setModalFormData] = useState({
        createdBy: currentUser,
        timestamp: null,
        title: "",
        content: "",
        likes: [],
        comments: []
    })

    const [titleError, setTitleError] = useState(false)
    const [contentError, setContentError] = useState(false)

    const { error, isPending, createDocument } = useFirestore()

    function handleChange(key, value) {
        setContentError(false)
        setTitleError(false)

        setModalFormData(prevData => ({ ...prevData, [key]: value, timestamp: serverTimestamp() }))
    }

    async function handleSubmit() {

        if (!modalFormData.title) {
            setTitleError(true)
        }

        if (!modalFormData.content) {
            setContentError(true)
        }

        if (modalFormData.title && modalFormData.content) {
            
            const success = await createDocument("posts", nanoid(), modalFormData)
            if (success) setShowModal(false)
        }
    }

    return (
        isPending 
        ?
        <Loader />
        :
        <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            sx={{ overflowY: "scroll" }}
        >
            <Container maxWidth="sm" sx={modalStyles} >
                <Paper sx={{ padding: 4 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                        <Typography fontWeight={700} color="primary" fontSize={18}>Add a new post</Typography>
                        <Stack direction="row" spacing={1} alignItems="center" >
                            <Avatar 
                                sx={{ height: 30, width: 30, fontSize: 14, color: "black", background: currentUser.color }}
                            >
                                { currentUser.username[0] }
                            </Avatar>
                            <Typography fontWeight={500}>{ currentUser.username }</Typography>
                        </Stack>
                    </Stack>

                    <form style={{ textAlign: "center" }}>
                        <TextField 
                            fullWidth 
                            variant="outlined" 
                            size="small"
                            label="Title"
                            sx={{ mb: 4}} 
                            onChange={e => handleChange("title", e.target.value)}
                            value={modalFormData.title}
                            error={titleError}
                            helperText={titleError ? "Incorrect Entry" : ""}
                        />
                        
                        <TextField 
                            fullWidth 
                            variant="outlined" 
                            size="small" 
                            label="Content"
                            multiline 
                            minRows={8}
                            maxRows={8}
                            onChange={e => handleChange("content", e.target.value)}
                            value={modalFormData.content}
                            error={contentError}
                            helperText={contentError ? "Incorrect Entry" : ""}
                        />

                        <Button
                            variant="contained"
                            disableElevation
                            sx={{ mt: 4, width: { xs: "100%", sm: "auto" } }}
                            children="SUBMIT"
                            onClick={handleSubmit}
                        />
                        
                        {error && <Error message={error} />}
                    </form>
                </Paper>
            </Container>
        </Modal>
    )
}
