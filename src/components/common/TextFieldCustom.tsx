import { styled, TextField } from '@mui/material'

const TextFieldCustom = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        // Target the root container of the input
        border: '1px solid black', // Custom border
        borderRadius: '10px', // Custom border radius
    },
    '& .MuiOutlinedInput-notchedOutline': {
        // Target the outline specifically
        border: 'none', // Remove the default outline
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid black', // Optional: Add hover styles
    },
    '& .MuiOutlinedInput-input': {
        padding: '10px', // Adjust padding if needed
    },
    width: '100%',
    height: '50px',
    marginBottom: '30px',
}))

export default TextFieldCustom
