import { Card, styled } from '@mui/material'
import * as React from 'react'

const CustomFormCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    textAlign: 'center',
    width: '420px',
    padding: '10px 40px 10px 40px',
    marginTop: '70px',
    border: '1px solid black',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
        border: 'none',
        padding: '0px 40px 10px 40px',
        marginTop: '30px',
    },
}))

interface Props {
    children: React.ReactNode
}

const FormCard: React.FC<Props> = (props: {
    children: React.ReactNode
}): React.ReactElement => {
    return <CustomFormCard>{props.children}</CustomFormCard>
}

export default FormCard
